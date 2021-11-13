import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import Header from './header'

const StickyWrapperStyled = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: ${({ theme }) => rgba(theme.palette.background, 0.9)};
  backdrop-filter: blur(5px);
`

const HeaderStyled = styled(Header)`
  padding-bottom: 1em;
`

const HeaderInsetStyled = styled(Header)`
  padding: 1em;
`

const HRStyled = styled.hr`
  border: 0;
  height: 0;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  border-bottom: 0.1em solid ${({ theme }) => theme.palette.headline};
  margin: 0;
`

const PageHeaderWrapper = ({ isSticky = false, className, children }) => {
  return isSticky ? (
    <StickyWrapperStyled className={className}>{children}</StickyWrapperStyled>
  ) : (
    <div className={className}>{children}</div>
  )
}

const PageHeader = ({ isSticky = false, isFullWidth = false, className }) => {
  return (
    <PageHeaderWrapper isSticky={isSticky} className={className}>
      {isFullWidth ? <HeaderStyled /> : <HeaderInsetStyled />}
      <HRStyled />
    </PageHeaderWrapper>
  )
}

export default PageHeader
