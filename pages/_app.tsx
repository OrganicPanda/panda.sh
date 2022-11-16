import React from 'react'
import '../styles/globals.css'
import '../public/pandastyle-theme-happyhues.css'
import '../public/pandastyle-elements.css'
import '../public/pandastyle-layout.css'
import '../public/pandastyle-stacks.css'
import '../public/pandastyle-typography.css'
import '../public/pandastyle-forms.css'
import '../public/pandastyle-cards.css'
import '../public/pandastyle-decorations.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
