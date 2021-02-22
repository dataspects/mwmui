import React from "react"
import { Grid } from "@material-ui/core"
import axios from "axios"
import ExtensionsInDirectory from "../components/ExtensionsInDirectory"
import ComposerjsonReq from "../components/ComposerjsonReq"
import WfLoadExtensions from "../components/WfLoadExtensions"

const Home = () => {
  const [extensionsInDirectory, setExtensionsInDirectory] = React.useState([])
  const [composerjsonReq, setComposerjsonReq] = React.useState([])
  const [wfLoadExtensions, setWfLoadExtensions] = React.useState([])
  const [mode, setMode] = React.useState("")

  React.useEffect(() => {
    axios.get(`${process.env.API_URL}?mode=development`).then(res => {
      setExtensionsInDirectory(res.data.extensionsInDirectory)
      setComposerjsonReq(res.data.composerjsonReq)
      setWfLoadExtensions(res.data.wfLoadExtensions)
      setMode(res.data.mode)
    })
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <p style={{ color: "red", fontWeight: "bold" }}>
          {mode} (<a href="https://dserver/wiki">Back to my MediaWiki...</a>)
        </p>
        <h2>Enable/disable existing extensions</h2>
        <h2>Install new extensions</h2>
        <a href="https://packagist.org/explore/?type=mediawiki-extension">
          Browse <b>packagist.org/explore/?type=mediawiki-extension</b>
        </a>
        <h2>App Store</h2>
        <h2>Extension Store</h2>
        <p>
          Extensions catalogue certified/secured e.g. by MWStake's Extensions
          Vetting Group
        </p>
      </Grid>
      <Grid item xs={4}>
        <ExtensionsInDirectory extensionsInDirectory={extensionsInDirectory} />
      </Grid>
      <Grid item xs={4}>
        <ComposerjsonReq composerjsonReq={composerjsonReq} />
      </Grid>
      <Grid item xs={4}>
        <WfLoadExtensions wfLoadExtensions={wfLoadExtensions} />
      </Grid>
    </Grid>
  )
}

export default Home
