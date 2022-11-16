import React, { ComponentProps } from 'react'
import classNames from 'classnames'
import { default as NextLink } from 'next/link'
import styles from './Typography.module.css'

type H1Props = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode
}

export const H1 = ({ className, children, ...restProps }: H1Props) => (
  <h1 {...restProps} className={classNames(styles.h1, className)}>
    {children}
  </h1>
)

type PProps = React.HTMLProps<HTMLParagraphElement> & {
  children: React.ReactNode
}

export const P = ({ className, children, ...restProps }: PProps) => (
  <p {...restProps} className={classNames(styles.h1, className)}>
    {children}
  </p>
)

type LinkProps = ComponentProps<typeof NextLink> & {
  children: React.ReactNode
}

export const Link = ({ className, children, ...restProps }: LinkProps) => (
  <NextLink className={classNames(styles.h1, className)} {...restProps}>
    {children}
  </NextLink>
)
