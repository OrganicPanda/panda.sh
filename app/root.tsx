import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import pandastyleCardsHref from './styles/pandastyle/pandastyle-cards.css'
import pandastyleCodeHref from './styles/pandastyle/pandastyle-code.css'
import pandastyleDecorationsHref from './styles/pandastyle/pandastyle-decorations.css'
import pandastyleElementsHref from './styles/pandastyle/pandastyle-elements.css'
import pandastyleFormsHref from './styles/pandastyle/pandastyle-forms.css'
import pandastyleGlobalsHref from './styles/pandastyle/pandastyle-globals.css'
import pandastyleLayoutHref from './styles/pandastyle/pandastyle-layout.css'
import pandastyleStacksHref from './styles/pandastyle/pandastyle-stacks.css'
import pandastyleThemeHappyhuesHref from './styles/pandastyle/pandastyle-theme-happyhues.css'
import pandastyleTypographyHref from './styles/pandastyle/pandastyle-typography.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: pandastyleGlobalsHref },
  { rel: 'stylesheet', href: pandastyleThemeHappyhuesHref },
  { rel: 'stylesheet', href: pandastyleCodeHref },
  { rel: 'stylesheet', href: pandastyleElementsHref },
  { rel: 'stylesheet', href: pandastyleLayoutHref },
  { rel: 'stylesheet', href: pandastyleStacksHref },
  { rel: 'stylesheet', href: pandastyleTypographyHref },
  { rel: 'stylesheet', href: pandastyleFormsHref },
  { rel: 'stylesheet', href: pandastyleCardsHref },
  { rel: 'stylesheet', href: pandastyleDecorationsHref },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

// export const links: LinksFunction = () => [
// ]

export default function App() {
  return (
    <html
      lang="en"
      className="🐼-theme-happyhues-palettes-base 🐼-theme-happyhues-sizing-base 🐼-html"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="🐼-body">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
