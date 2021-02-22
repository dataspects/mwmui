import React from "react"
import { Helmet } from "react-helmet"

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>dataspects MediaWiki Manager</title>
        <link rel="canonical" href="https://dserver/ui" />
      </Helmet>
      <h1>MediaWiki Manager</h1>
      {children}
    </>
  )
}
