import React from "react"
import { Grid } from "@material-ui/core"
import axios from "axios"
import ExtensionsInDirectory from "../components/ExtensionsInDirectory"
import ComposerjsonReq from "../components/ComposerjsonReq"
import WfLoadExtensions from "../components/WfLoadExtensions"
import Apps from "../components/Apps"
import ExtensionStore from "../components/ExtensionStore"
import AppStore from "../components/AppStore"

const Home = () => {
  const [extensionsInDirectory, setExtensionsInDirectory] = React.useState([])
  const [composerjsonReq, setComposerjsonReq] = React.useState([])
  const [wfLoadExtensions, setWfLoadExtensions] = React.useState([])
  const [extensionCatalogue, setExtensionCatalogue] = React.useState([])
  const [appCatalogue, setAppCatalogue] = React.useState([])

  React.useEffect(() => {
    axios.get(`${process.env.API_URL}?action=overview`).then(res => {
      setExtensionsInDirectory(res.data.extensionsInDirectory)
      setComposerjsonReq(res.data.composerjsonReq)
      setWfLoadExtensions(res.data.wfLoadExtensions)
    })
    axios.get(`${process.env.API_URL}?action=extensionCatalogue`).then(res => {
      setExtensionCatalogue(res.data.extensionCatalogue)
    })
    axios.get(`${process.env.API_URL}?action=appCatalogue`).then(res => {
      console.log(res.data.appCatalogue)
      setAppCatalogue(res.data.appCatalogue)
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

  const [currentAppName, setCurrentAppName] = React.useState("")
  const handleAppName = event => {
    setCurrentAppName(event.target.value)
  }

  const handleManageApp = event => {
    event.preventDefault()
    // const { mode } = event.currentTarget.elements
    // axios
    //   .get(
    //     `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
    //   )
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <a href="https://dserver/wiki">Back to my MediaWiki...</a>
      </Grid>
      <Grid item xs={6}>
        <ExtensionStore
          handleManageExtension={handleManageExtension}
          handleExtensionName={handleExtensionName}
          currentExtensionName={currentExtensionName}
          extensionCatalogue={extensionCatalogue}
        />
      </Grid>
      <Grid item xs={6}>
        <AppStore
          handleManageApp={handleManageApp}
          handleAppName={handleAppName}
          currentAppName={currentAppName}
          appCatalogue={appCatalogue}
        />
      </Grid>
      <Grid item xs={3}>
        <ExtensionsInDirectory extensionsInDirectory={extensionsInDirectory} />
      </Grid>
      <Grid item xs={3}>
        <ComposerjsonReq composerjsonReq={composerjsonReq} />
      </Grid>
      <Grid item xs={3}>
        <WfLoadExtensions wfLoadExtensions={wfLoadExtensions} />
      </Grid>
      <Grid item xs={3}>
        <Apps apps={{}} />
      </Grid>
    </Grid>
  )
}

export default Home
