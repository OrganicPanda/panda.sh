import React from 'react'
import classNames from 'classnames'
import styles from './Header.module.css'
import { H1, Link } from './Typography'

type HeaderProps = {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <H1>
        <Link href="/" className={classNames('🐼-text', styles.a)}>
          panda.sh
        </Link>
      </H1>
    </header>
  )
}

export default Header
