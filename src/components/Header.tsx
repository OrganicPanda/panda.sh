import React from 'react'
import { HeaderLink, Title } from './Typography'

type HeaderProps = {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <HeaderLink href="/">
        <Title>panda.sh</Title>
      </HeaderLink>
    </header>
  )
}

export default Header
