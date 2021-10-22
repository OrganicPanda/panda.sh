import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { H1, A } from './typography'

const AStyled = styled(A)`
  text-decoration: none;

  :visited,
  :active,
  :hover {
    color: inherit;
  }
`

const Header = ({ className }) => {
  return (
    <header className={className}>
      <H1>
        <Link href='/' passHref>
          <AStyled>panda.sh</AStyled>
        </Link>
      </H1>
    </header>
  )
}

export default Header
