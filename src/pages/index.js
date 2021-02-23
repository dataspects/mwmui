import React from "react"
import { Grid, Paper, LinearProgress } from "@material-ui/core"
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
  const [logOutput, setLogOutput] = React.useState("Log output...")

  const getExtensionsOverview = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=overview`).then(res => {
      setExtensionsInDirectory(res.data.extensionsInDirectory)
      setComposerjsonReq(res.data.composerjsonReq)
      setWfLoadExtensions(res.data.wfLoadExtensions)
    })
  }, [])

  React.useEffect(() => {
    getExtensionsOverview()
    axios.get(`${process.env.API_URL}?action=extensionCatalogue`).then(res => {
      setExtensionCatalogue(res.data.extensionCatalogue)
      setLogOutput(res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=appCatalogue`).then(res => {
      setAppCatalogue(res.data.appCatalogue)
      setLogOutput(res.data.status)
    })
  }, [getExtensionsOverview])

  const [currentExtensionName, setCurrentExtensionName] = React.useState("")
  const handleExtensionName = event => {
    setCurrentExtensionName(event.target.value)
  }

  const handleManageExtension = event => {
    event.preventDefault()
    const { mode } = event.currentTarget.elements
    setLogOutput(
      <>
        <span>Managing extension {currentExtensionName}...</span>
        <LinearProgress />
      </>
    )
    axios
      .get(
        `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
      )
      .then(res => {
        getExtensionsOverview()
        setLogOutput(res.data.status)
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
    //     setLogOutput(JSON.stringify(res.data.status))
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
      <Grid item xs={12}>
        <Paper>{logOutput}</Paper>
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
