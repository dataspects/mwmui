import React from "react"
import { Helmet } from "react-helmet"
import { Grid, Box } from "@material-ui/core"

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>dataspects MediaWiki Manager</title>
        <link rel="canonical" href="https://dserver/ui" />
      </Helmet>
      <Grid container spacing={5}>
        <Grid item xs={2}>
          {/* FIXME: this image doesn't use the path prefix, so I hacked a ui/ in front of it. */}
          <img src="/ui/images/dataspects.png" alt="dataspects" />
        </Grid>
        <Grid item xs={10}>
          <Box m={3}>
            <h1>MediaWiki Manager</h1>
          </Box>
        </Grid>
      </Grid>
      {children}
    </>
  )
}
