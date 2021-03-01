import React from "react"
import { Grid, Box, Paper } from "@material-ui/core"
import axios from "axios"

import ExtensionStore from "../components/ExtensionStore"
import UpgradeManager from "../components/UpgradeManager"
import SnapshotManager from "../components/SnapshotManager"
import AppStore from "../components/AppStore"
import Help from "../components/Help"
import Log from "../components/Log"
import MediaWikiInfo from "../components/MediaWikiInfo"

const Home = () => {
  const [extensionsInDirectory, setExtensionsInDirectory] = React.useState([])
  const [composerjsonReq, setComposerjsonReq] = React.useState([])
  const [wfLoadExtensions, setWfLoadExtensions] = React.useState([])
  const [extensionsByMWAPI, setExtensionsByMWAPI] = React.useState([])
  const [extensionCatalogue, setExtensionCatalogue] = React.useState([])
  const [generalSiteInfo, setGeneralSiteInfo] = React.useState([])
  const [appCatalogue, setAppCatalogue] = React.useState([])
  const [installedApps, setInstalledApps] = React.useState([])
  const [snapshotCatalogue, setSnapshotCatalogue] = React.useState([])
  const [upgradesCatalogue, setUpgradesCatalogue] = React.useState({})
  const [logStack, setLogStack] = React.useState([])

  const getGeneralSiteInfo = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=generalSiteInfo`).then(res => {
      setGeneralSiteInfo(res.data.generalSiteInfo)
      addToLogStack(res.data.status)
    })
  }, [])

  const getExtensionsOverview = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=overview`).then(res => {
      setExtensionsInDirectory(res.data.extensionsInDirectory)
      setComposerjsonReq(res.data.composerjsonReq)
      setWfLoadExtensions(res.data.wfLoadExtensions)
    })
  }, [])

  const getSnapshotsCatalogue = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=snapshotCatalogue`).then(res => {
      setSnapshotCatalogue(res.data.snapshotCatalogue)
      addToLogStack(res.data.status)
    })
  }, [])

  const getInstalledApps = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=installedApps`).then(res => {
      setInstalledApps(res.data.installedApps)
      addToLogStack(res.data.status)
    })
  }, [])

  const getExtensionsByMWAPI = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=extensionsByMWAPI`).then(res => {
      setExtensionsByMWAPI(res.data.extensionsByMWAPI)
      addToLogStack(res.data.status)
    })
  }, [])

  React.useEffect(() => {
    getExtensionsOverview()
    getGeneralSiteInfo()
    axios.get(`${process.env.API_URL}?action=extensionCatalogue`).then(res => {
      setExtensionCatalogue(res.data.extensionCatalogue)
      addToLogStack(res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=appCatalogue`).then(res => {
      setAppCatalogue(res.data.appCatalogue)
      addToLogStack(res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=upgradesCatalogue`).then(res => {
      setUpgradesCatalogue(res.data.upgradesCatalogue)
      addToLogStack(res.data.status)
    })
    getExtensionsByMWAPI()
    getInstalledApps()
    getSnapshotsCatalogue()
  }, [
    getExtensionsOverview,
    getSnapshotsCatalogue,
    getGeneralSiteInfo,
    getInstalledApps,
  ])

  const [currentExtensionName, setCurrentExtensionName] = React.useState("")
  const handleExtensionName = event => {
    setCurrentExtensionName(event.target.value)
  }

  const handleManageExtension = event => {
    event.preventDefault()
    const { mode } = event.currentTarget.elements
    console.log(currentExtensionName)
    addToLogStack(`Managing extension ${currentExtensionName}...`)
    axios
      .get(
        `${process.env.API_URL}?action=manageExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
      )
      .then(res => {
        getExtensionsOverview()
        addToLogStack(res.data.status)
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
    const { mode } = event.currentTarget.elements
    axios
      .get(
        `${process.env.API_URL}?action=manageApp&mode=${mode.value}&appName=${currentAppName}`
      )
      .then(res => {
        addToLogStack(res.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const takeSnapshot = () => {
    addToLogStack("Taking snapshot...")
    axios
      .get(`${process.env.API_URL}?action=takeSnapshot`)
      .then(res => {
        addToLogStack(res.data.status)
        getSnapshotsCatalogue()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUpgradeNow = () => {
    addToLogStack("Upgrading now...")
    axios
      .get(`${process.env.API_URL}?action=upgradeNow`)
      .then(res => {
        getGeneralSiteInfo()
        addToLogStack(res.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const logStackRef = React.useRef({})
  const addToLogStack = item => {
    setLogStack(logStack => [...logStack, item])
  }

  React.useEffect(() => {
    logStackRef.current.scrollTop = logStackRef.current.scrollHeight
  }, [logStack])

  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Paper>
          <Box p={2}>
            <Help />
          </Box>
        </Paper>
        <Box mt={2}>
          <Log logStackRef={logStackRef} logStack={logStack} />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <MediaWikiInfo generalSiteInfo={generalSiteInfo} />
      </Grid>
      <Grid item xs={6}>
        <ExtensionStore
          handleManageExtension={handleManageExtension}
          handleExtensionName={handleExtensionName}
          currentExtensionName={currentExtensionName}
          extensionCatalogue={extensionCatalogue}
          extensionsByMWAPI={extensionsByMWAPI}
          composerjsonReq={composerjsonReq}
          wfLoadExtensions={wfLoadExtensions}
          extensionsInDirectory={extensionsInDirectory}
          getExtensionsOverview={getExtensionsOverview}
          getExtensionsByMWAPI={getExtensionsByMWAPI}
        />
      </Grid>
      <Grid item xs={6}>
        <AppStore
          handleManageApp={handleManageApp}
          handleAppName={handleAppName}
          currentAppName={currentAppName}
          appCatalogue={appCatalogue}
          installedApps={installedApps}
          getInstalledApps={getInstalledApps}
        />
      </Grid>
      <Grid item xs={6}>
        <UpgradeManager
          upgradesCatalogue={upgradesCatalogue}
          generalSiteInfo={generalSiteInfo}
          handleUpgradeNow={handleUpgradeNow}
        />
      </Grid>
      <Grid item xs={6}>
        <SnapshotManager
          snapshotCatalogue={snapshotCatalogue}
          takeSnapshot={takeSnapshot}
        />
      </Grid>
    </Grid>
  )
}

export default Home
