import type { LinksFunction } from '@netlify/remix-runtime'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import './styles/pandastyle/pandastyle-globals.css'
import './styles/pandastyle/pandastyle-theme-happyhues.css'
import './styles/pandastyle/pandastyle-code.css'
import './styles/pandastyle/pandastyle-elements.css'
import './styles/pandastyle/pandastyle-layout.css'
import './styles/pandastyle/pandastyle-stacks.css'
import './styles/pandastyle/pandastyle-typography.css'
import './styles/pandastyle/pandastyle-forms.css'
import './styles/pandastyle/pandastyle-cards.css'
import './styles/pandastyle/pandastyle-decorations.css'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

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
