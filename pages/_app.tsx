import React from 'react'
import '../src/styles/globals.css'
import '../src/styles/pandastyle/pandastyle-theme-happyhues.css'
import '../src/styles/pandastyle/pandastyle-elements.css'
import '../src/styles/pandastyle/pandastyle-layout.css'
import '../src/styles/pandastyle/pandastyle-stacks.css'
import '../src/styles/pandastyle/pandastyle-typography.css'
import '../src/styles/pandastyle/pandastyle-forms.css'
import '../src/styles/pandastyle/pandastyle-cards.css'
import '../src/styles/pandastyle/pandastyle-decorations.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
