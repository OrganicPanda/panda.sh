import { Summary as January2024Summary } from './january-2024'

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
            <H3>
              <PlainLink to="/january-2024">January</PlainLink>
            </H3>
            <p className="🐼-text">
              <January2024Summary />
            </p>
            <p className="🐼-text">
              <Link to="/january-2024">Read more</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
