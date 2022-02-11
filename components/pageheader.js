import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import Header from './header'

const StickyWrapperStyled = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--🎨-background);
  backdrop-filter: blur(5px);
`

const HeaderStyled = styled(Header)`
  padding-bottom: var(--📏-container-padding);
`

const HeaderInsetStyled = styled(Header)`
  padding: var(--📏-container-padding);
`

const HRStyled = styled.hr`
  border: 0;
  height: 0;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  border-bottom: var(--📏-art-stroke-1) solid var(--🎨-border);
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
