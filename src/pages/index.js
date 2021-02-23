import React from "react"
import { Grid } from "@material-ui/core"
import axios from "axios"
import ExtensionsInDirectory from "../components/ExtensionsInDirectory"
import ComposerjsonReq from "../components/ComposerjsonReq"
import WfLoadExtensions from "../components/WfLoadExtensions"
import ExtensionStore from "../components/ExtensionStore"

const Home = () => {
  const [extensionsInDirectory, setExtensionsInDirectory] = React.useState([])
  const [composerjsonReq, setComposerjsonReq] = React.useState([])
  const [wfLoadExtensions, setWfLoadExtensions] = React.useState([])
  const [extensionCatalogue, setExtensionCatalogue] = React.useState([])

  React.useEffect(() => {
    axios.get(`${process.env.API_URL}?action=overview`).then(res => {
      setExtensionsInDirectory(res.data.extensionsInDirectory)
      setComposerjsonReq(res.data.composerjsonReq)
      setWfLoadExtensions(res.data.wfLoadExtensions)
    })
    axios.get(`${process.env.API_URL}?action=extensionCatalogue`).then(res => {
      setExtensionCatalogue(res.data.extensionCatalogue)
    })
  }, [])

  const [currentExtensionName, setCurrentExtensionName] = React.useState("")
  const handleExtensionName = event => {
    setCurrentExtensionName(event.target.value)
  }

  const handleManageExtension = event => {
    event.preventDefault()
    const { mode } = event.currentTarget.elements
    axios
      .get(
        `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
      )
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <p>
          <a href="https://dserver/wiki">Back to my MediaWiki...</a>
        </p>
        <ExtensionStore
          handleManageExtension={handleManageExtension}
          handleExtensionName={handleExtensionName}
          currentExtensionName={currentExtensionName}
          extensionCatalogue={extensionCatalogue}
        />
        <h2>App Store</h2>
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
