import React from 'react'
import Head from './Head'

export default function BasicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head />

      {children}
    </>
  )
}
