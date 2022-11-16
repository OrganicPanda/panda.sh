import React from 'react'
import styles from './PageHeader.module.css'
import Header from './Header'
import classNames from 'classnames'

type PageHeaderWrapperProps = {
  isSticky?: boolean
  className?: string
  children: React.ReactNode
}

const PageHeaderWrapper = ({
  isSticky = false,
  className,
  children,
}: PageHeaderWrapperProps) => {
  const stickyClass = {
    [styles['sticky-header']]: isSticky,
  }

  return <div className={classNames(stickyClass, className)}>{children}</div>
}

type PageHeaderProps = {
  isSticky?: boolean
  isFullWidth?: boolean
  className?: string
}

export const PageHeader = ({
  isSticky = false,
  isFullWidth = false,
  className,
}: PageHeaderProps) => {
  return (
    <PageHeaderWrapper isSticky={isSticky} className={className}>
      <Header
        className={isFullWidth ? styles.header : styles['inset-header']}
      />
      <hr className={styles.hr} />
    </PageHeaderWrapper>
  )
}
