import React from 'react'
import classNames from 'classnames'
import acorn, { Parser } from 'acorn'
import typescript from 'acorn-typescript'
import { walk } from 'estree-walker'
import { CodeBlockProps } from './Typography'

type Range = { start: number; end: number; wrapWith: string[] }

interface Node extends Range {
  children: Node[]
}

// Insert a new node into the tree, maintaining the nesting of the ranges
function insertNode(root: Node, newNode: Node) {
  for (const child of root.children) {
    if (newNode.start >= child.start && newNode.end <= child.end) {
      insertNode(child, newNode)
      return
    }
  }

  let i = root.children.length - 1
  while (i >= 0) {
    const child = root.children[i]
    if (child.start >= newNode.start && child.end <= newNode.end) {
      root.children.splice(i, 1)
      newNode.children.push(child)
    }
    i--
  }

  root.children.push(newNode)
  root.children.sort((a, b) => a.start - b.start)
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Depth-first traversal of the tree to construct the wrapped text
function buildText(
  root: Node,
  originalText: string,
  start: number,
  end: number
): string {
  let result = ''
  let i = start

  for (const child of root.children) {
    if (i < child.start) {
      result += escapeHtml(originalText.substring(i, child.start))
    }
    result +=
      child.wrapWith[0] +
      buildText(child, originalText, child.start, child.end) +
      child.wrapWith[1]
    i = child.end
  }

  if (i < end) {
    result += escapeHtml(originalText.substring(i, end))
  }

  return result
}

// Main function to wrap text based on the given ranges
function wrapText(text: string, ranges: Range[]): string {
  // Create a root node that covers the entire text
  const root: Node = {
    start: 0,
    end: text.length,
    wrapWith: ['', ''],
    children: []
  }

  // Build the tree of ranges
  for (const range of ranges) {
    const node: Node = { ...range, children: [] }
    insertNode(root, node)
  }

  // Build the wrapped text
  return buildText(root, text, 0, text.length)
}

// Maybe convert hljs styles to css custom properties
// Then convert this to actuall styles so nesting can be controlled
const classNamesForNode = {
  literal: 'hljs-literal',
  importdeclaration: 'hljs-keyword',
  importnamespacespecifier: 'hljs-default',
  identifier: 'hljs-title',
  variabledeclaration: 'hljs-keyword',
  exportnameddeclaration: 'hljs-keyword',
  returnstatement: 'hljs-keyword',
  arraypattern: 'hljs-default',
  arrowfunctionexpression: 'hljs-default',
  jsxfragment: 'hljs-tag',
  jsxidentifier: 'hljs-name',
  jsxexpressioncontainer: 'hljs-default',
  templateliteral: 'hljs-literal',
  jsxattribute: 'hljs-attr' // Overridden by jsxidentifier: 'hljs-name',
}

export const CodeBlockAcorn3 = ({
  className,
  children,
  language = 'typescript',
  ...restProps
}: CodeBlockProps) => {
  if (typeof children !== 'string')
    throw new Error(
      `CodeBlockAcorn3 only supports a single child of type string. typeof children = ${typeof children}`
    )

  let highlighted = ''

  try {
    const finalText = children.trim()

    const ast = Parser.extend(
      typescript({
        // dts: true,
        jsx: {
          allowNamespaces: true
        }
      })
    ).parse(finalText, {
      sourceType: 'module',
      ecmaVersion: 'latest',
      locations: true
    })

    // let currentIndex = 0
    const rangesToWrap: Range[] = []

    const seenNodes = new Set<acorn.Node>()

    const outputNode = (node: acorn.Node) => {
      // Not sure why I get this called multiple times with the same node
      if (seenNodes.has(node)) return

      seenNodes.add(node)

      rangesToWrap.push({
        start: node.loc?.start.index,
        end: node.loc?.end.index,
        wrapWith: [
          `<span data-node-type="${node.type.toLowerCase()}">`,
          '</span>'
        ]
      })
    }

    const NOOP = () => {}

    // class MyDynamicObject {
    //   constructor() {
    //     return new Proxy(this, {
    //       get: function (target: any, property: string) {
    //         if (isToken(property)) return outputNode
    //         return NOOP
    //       }
    //     })
    //   }
    // }
    // let obj = new MyDynamicObject()
    walk(ast, {
      enter(node, parent, prop, index) {
        outputNode(node)
        // some code happens
      },
      leave(node, parent, prop, index) {
        // some code happens
      }
    })

    // simple(ast, obj)
    // const inputText = "Hello, this is a sample text!";
    // const rangesToWrap: Range[] = [
    //     { start: 7, end: 23, wrapWith: ["<div>", "</div>"] },      // wraps 'this is a sample'
    //     { start: 7, end: 11, wrapWith: ["<another>", "</another>"] }, // wraps 'this'
    //     { start: 7, end: 11, wrapWith: ["<strong>", "</strong>"] }, // wraps 'this'
    //     { start: 17, end: 23, wrapWith: ["<em>", "</em>"] }        // wraps 'sample'
    // ];
    console.log('rangesToWrap', rangesToWrap)

    const output = wrapText(finalText, rangesToWrap)
    // const output = 'yo'
    highlighted = output
  } catch (error) {
    console.error(error)
  }

  return (
    <pre
      {...restProps}
      className={classNames('🐼-code 🐼-code-block', className)}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    ></pre>
  )
}
