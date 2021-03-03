import React from "react"
import { Helmet } from "react-helmet"
import { Link, Grid, Box } from "@material-ui/core"
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
        <link
          rel="shortcut icon"
          href="https://dserver/ui/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box p={5}>
          <Grid container spacing={5}>
            <Grid item xs={2}>
              {/* FIXME: this image doesn't use the path prefix, so I hacked a ui/ in front of it. */}
              <img src="/ui/images/dataspects.png" alt="dataspects" />
            </Grid>
            <Grid item xs={8} style={{ textAlign: "center" }}>
              <Box fontSize="h4.fontSize" m={1}>
                <img
                  src="/ui/images/mwstake.png"
                  alt="MWStake"
                  style={{ width: "50px", verticalAlign: "middle" }}
                />{" "}
                MediaWiki Manager
              </Box>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              {process.env.VERSION}
              <br />
              <Link href="https://dserver/wiki">Back to my MediaWiki...</Link>
            </Grid>
          </Grid>
          {children}
        </Box>
      </ThemeProvider>
    </>
  )
}
