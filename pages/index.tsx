import React from 'react'
import { PageHeader } from '../src/components/PageHeader'
import { BasicLayout } from '../src/components/layout/BasicLayout'
import { H2, H3, HeaderLink, Link } from '../src/components/Typography'
import { Summary as January2023Summary } from './january-2023'

export default function Index() {
  return (
    <BasicLayout>
      <PageHeader />

      <div className="🐼-section">
        <div className="🐼-section-page 🐼-section-text">
          <div className="🐼-section-item">
            <H2>2023</H2>
            <H3>
              <HeaderLink href="/january-2023">January</HeaderLink>
            </H3>
            <p className="🐼-text">
              <January2023Summary />
            </p>
            <p className="🐼-text">
              <Link href="/january-2023">Read more</Link>
            </p>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
