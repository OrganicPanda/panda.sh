import React from 'react'

import { PlainLink, Title } from './Typography'

type HeaderProps = {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={className}>
      <Title>
        <PlainLink to="/">panda.sh</PlainLink>
      </Title>
    </header>
  )
}

export default Header
