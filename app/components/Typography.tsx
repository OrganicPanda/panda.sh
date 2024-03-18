import type { ComponentProps } from 'react'
import React from 'react'

import { Link as RemixLink } from '@remix-run/react'
import classNames from 'classnames'
import hljs from 'highlight.js'

type TitleProps = React.HTMLProps<HTMLParagraphElement> & {
  children: React.ReactNode
}

export const Title = ({ className, children, ...restProps }: TitleProps) => (
  <p {...restProps} className={classNames('🐼-title', className)}>
    {children}
  </p>
)

type H1Props = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode
}

export const H1 = ({ className, children, ...restProps }: H1Props) => (
  <h1
    {...restProps}
    className={classNames('🐼-heading 🐼-heading-1', className)}
  >
    {children}
  </h1>
)

type H2Props = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode
}

export const H2 = ({ className, children, ...restProps }: H2Props) => (
  <h2
    {...restProps}
    className={classNames('🐼-heading 🐼-heading-2', className)}
  >
    {children}
  </h2>
)

type H3Props = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode
}

export const H3 = ({ className, children, ...restProps }: H3Props) => (
  <h3
    {...restProps}
    className={classNames('🐼-heading 🐼-heading-3', className)}
  >
    {children}
  </h3>
)

type PProps = React.HTMLProps<HTMLParagraphElement> & {
  children: React.ReactNode
}

export const P = ({ className, children, ...restProps }: PProps) => (
  <p {...restProps} className={classNames('🐼-paragraph', className)}>
    {children}
  </p>
)

type CodeProps = React.HTMLProps<HTMLParagraphElement> & {
  children: React.ReactNode
  language?: string
}

export const Code = ({
  className,
  children,
  language = 'typescript',
  ...restProps
}: CodeProps) => {
  if (typeof children !== 'string')
    throw new Error(
      `Code only supports a single child of type string. typeof children = ${typeof children}`
    )

  const trimmed = children.trim()
  const highlighted = hljs.highlight(trimmed, { language }).value

  return (
    <code
      {...restProps}
      className={classNames('🐼-code', className)}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}

type AnchorProps = React.HTMLProps<HTMLAnchorElement> & {
  className?: string
  children: React.ReactNode
}

export const Anchor = ({ className, children, ...restProps }: AnchorProps) => (
  <a className={classNames('🐼-link', className)} {...restProps}>
    {children}
  </a>
)

type LinkProps = ComponentProps<typeof RemixLink> & {
  children: React.ReactNode
}

export const Link = ({ className, children, ...restProps }: LinkProps) => (
  <RemixLink className={classNames('🐼-link', className)} {...restProps}>
    {children}
  </RemixLink>
)

export const PlainLink = ({ className, children, ...restProps }: LinkProps) => (
  <Link className={classNames('🐼-link-plain', className)} {...restProps}>
    {children}
  </Link>
)
