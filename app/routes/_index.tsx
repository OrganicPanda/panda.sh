import { Summary as February2024Summary } from './2024.february'
import { Summary as January2024Summary } from './2024.january'

import { PageHeader } from '~/components/PageHeader'
import { H2, H3, PlainLink, Link } from '~/components/Typography'

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers
  parentHeaders: Headers
}) {
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    'Cache-Control': 'public, max-age=60, s-maxage=60',
  }
}

export default function Index() {
  return (
    <>
      <PageHeader />
      <div className="🐼-section">
        <div className="🐼-section-page 🐼-section-text">
          <div className="🐼-section-item">
            <H2>2024</H2>
          </div>

          <div className="🐼-section-item">
            <H3>
              <PlainLink to="/2024/january">January</PlainLink>
            </H3>
            <p className="🐼-text">
              <January2024Summary />
            </p>
            <p className="🐼-text">
              <Link to="/2024/january">Read more</Link>
            </p>
          </div>

          <div className="🐼-section-item">
            <H3>
              <PlainLink to="/2024/february">February</PlainLink>
            </H3>
            <p className="🐼-text">
              <February2024Summary />
            </p>
            <p className="🐼-text">
              <Link to="/2024/february">Read more</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
