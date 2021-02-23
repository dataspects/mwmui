import React from "react"
import { Helmet } from "react-helmet"
import { Grid, Box } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import Theme from "../theme"
import CssBaseline from "@material-ui/core/CssBaseline"

// const useStyles = makeStyles(theme => ({
//   root: {},
// }))

export default function Layout({ children }) {
  // const classes = useStyles(Theme)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>dataspects MediaWiki Manager</title>
        <link rel="canonical" href="https://dserver/ui" />
      </Helmet>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box p={5}>
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
        </Box>
      </ThemeProvider>
    </>
  )
}
