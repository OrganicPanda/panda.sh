import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { H1, A } from './typography'

const AStyled = styled(A)`
  text-decoration: none;
  color: var(--🎨-heading);

  :visited,
  :active,
  :hover {
    color: var(--🎨-heading);
  }
`

const Header = ({ className }) => {
  return (
    <header className={className}>
      <H1>
        <Link href='/' passHref>
          <AStyled className="🐼-text">panda.sh</AStyled>
        </Link>
      </H1>
    </header>
  )
}

export default Header
