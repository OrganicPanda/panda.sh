import React from 'react'

import classNames from 'classnames'

import Header from './Header'
import styles from './PageHeader.module.css'

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
  const classes = {
    [styles['sticky-wrapper']]: isSticky,
  }

  return <div className={classNames(classes, className)}>{children}</div>
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
      {isFullWidth ? (
        <div className="🐼-section 🐼-section-clear">
          <Header />
        </div>
      ) : null}

      {!isFullWidth ? (
        <div className="🐼-section 🐼-section-clear">
          <div className="🐼-section-page">
            <Header />
          </div>
        </div>
      ) : null}

      <hr className={styles.hr} />
    </PageHeaderWrapper>
  )
}
