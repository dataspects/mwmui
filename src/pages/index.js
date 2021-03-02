import React from "react"
import { Grid, Box, Paper, LinearProgress, Typography } from "@material-ui/core"
import axios from "axios"

import ExtensionStore from "../components/ExtensionStore"
import UpgradeManager from "../components/UpgradeManager"
import SnapshotManager from "../components/SnapshotManager"
import AppStore from "../components/AppStore"
import Help from "../components/Help"
import Log from "../components/Log"
import MediaWiki from "../components/MediaWiki"

const Home = () => {
  const [extensionsInDirectory, setExtensionsInDirectory] = React.useState([])
  const [composerjsonReq, setComposerjsonReq] = React.useState([])
  const [wfLoadExtensions, setWfLoadExtensions] = React.useState([])
  const [extensionsByMWAPI, setExtensionsByMWAPI] = React.useState([])
  const [extensionCatalogue, setExtensionCatalogue] = React.useState([])
  const [generalSiteInfo, setGeneralSiteInfo] = React.useState(null)
  const [appCatalogue, setAppCatalogue] = React.useState([])
  const [installedApps, setInstalledApps] = React.useState([])
  const [snapshotCatalogue, setSnapshotCatalogue] = React.useState([])
  const [upgradesCatalogue, setUpgradesCatalogue] = React.useState({})
  const [logStack, setLogStack] = React.useState([])
  const [systemIsBusy, setSystemIsBusy] = React.useState(false)

  const getGeneralSiteInfo = React.useCallback(() => {
    axios
      .get(`${process.env.API_URL}?action=generalSiteInfo`)
      .then(res => {
        if (res.data.status.endsWith("MediaWiki info loaded")) {
          setGeneralSiteInfo(res.data.generalSiteInfo)
          addToLogStack(res.data.status)
        }
      })
      .catch(err => {})
  }, [])

  const getExtensionsOverview = React.useCallback(() => {
    axios
      .get(`${process.env.API_URL}?action=overview`)
      .then(res => {
        setExtensionsInDirectory(res.data.extensionsInDirectory)
        setComposerjsonReq(res.data.composerjsonReq)
        setWfLoadExtensions(res.data.wfLoadExtensions)
      })
      .catch(err => {})
  }, [])

  const getSnapshotsCatalogue = React.useCallback(() => {
    axios
      .get(`${process.env.API_URL}?action=snapshotCatalogue`)
      .then(res => {
        setSnapshotCatalogue(res.data.snapshotCatalogue)
        addToLogStack(res.data.status)
      })
      .catch(err => {})
  }, [])

  const getInstalledApps = React.useCallback(() => {
    axios
      .get(`${process.env.API_URL}?action=installedApps`)
      .then(res => {
        setInstalledApps(res.data.installedApps)
        addToLogStack(res.data.status)
      })
      .catch(err => {})
  }, [])

  const getExtensionsByMWAPI = React.useCallback(() => {
    axios
      .get(`${process.env.API_URL}?action=extensionsByMWAPI`)
      .then(res => {
        setExtensionsByMWAPI(res.data.extensionsByMWAPI)
        addToLogStack(res.data.status)
      })
      .catch(err => {})
  }, [])

  React.useEffect(() => {
    getGeneralSiteInfo()
    getExtensionsOverview()
    axios
      .get(`${process.env.API_URL}?action=extensionCatalogue`)
      .then(res => {
        setExtensionCatalogue(res.data.extensionCatalogue)
        addToLogStack(res.data.status)
      })
      .catch(err => {})
    axios
      .get(`${process.env.API_URL}?action=appCatalogue`)
      .then(res => {
        setAppCatalogue(res.data.appCatalogue)
        addToLogStack(res.data.status)
      })
      .catch(err => {})
    axios
      .get(`${process.env.API_URL}?action=upgradesCatalogue`)
      .then(res => {
        setUpgradesCatalogue(res.data.upgradesCatalogue)
        addToLogStack(res.data.status)
      })
      .catch(err => {})
    getExtensionsByMWAPI()
    getInstalledApps()
    getSnapshotsCatalogue()
  }, [
    getExtensionsOverview,
    getSnapshotsCatalogue,
    getGeneralSiteInfo,
    getInstalledApps,
    getExtensionsByMWAPI,
  ])

  const [currentExtensionName, setCurrentExtensionName] = React.useState("")
  const handleExtensionName = event => {
    setCurrentExtensionName(event.target.value)
  }

  const handleManageExtension = event => {
    event.preventDefault()
    const { mode } = event.currentTarget.elements
    console.log(currentExtensionName)
    setSystemIsBusy(true)
    addToLogStack(`Managing extension ${currentExtensionName}...`)
    axios
      .get(
        `${process.env.API_URL}?action=manageExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
      )
      .then(res => {
        getExtensionsOverview()
        getExtensionsByMWAPI()
        setSystemIsBusy(false)
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
    setSystemIsBusy(true)
    addToLogStack(`Managing app ${currentAppName}...`)
    axios
      .get(
        `${process.env.API_URL}?action=manageApp&mode=${mode.value}&appName=${currentAppName}`
      )
      .then(res => {
        setSystemIsBusy(false)
        addToLogStack(res.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const takeSnapshot = () => {
    setSystemIsBusy(true)
    addToLogStack("Taking snapshot...")
    axios
      .get(`${process.env.API_URL}?action=takeSnapshot`)
      .then(res => {
        setSystemIsBusy(false)
        addToLogStack(res.data.status)
        getSnapshotsCatalogue()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUpgradeNow = () => {
    setSystemIsBusy(true)
    addToLogStack("Upgrading now...")
    axios
      .get(`${process.env.API_URL}?action=upgradeNow`)
      .then(res => {
        getGeneralSiteInfo()
        setSystemIsBusy(false)
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

  const runTest = React.useCallback(() => {
    setSystemIsBusy(true)
    addToLogStack("Running test")
    axios
      .get(`${process.env.API_URL}?action=runTest`)
      .then(res => {
        getExtensionsOverview()
        getSnapshotsCatalogue()
        getGeneralSiteInfo()
        getInstalledApps()
        getExtensionsByMWAPI()
        addToLogStack(res.data.status)
        setSystemIsBusy(false)
      })
      .catch(err => {
        console.log("Error running test: " + err)
      })
  }, [
    getExtensionsOverview,
    getSnapshotsCatalogue,
    getGeneralSiteInfo,
    getInstalledApps,
    getExtensionsByMWAPI,
  ])

  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Paper>
          <Box p={2}>
            <Help runTest={runTest} />
          </Box>
        </Paper>
        <Box mt={2}>
          <Log
            logStackRef={logStackRef}
            logStack={logStack}
            systemIsBusy={systemIsBusy}
          />
        </Box>
      </Grid>
      {generalSiteInfo ? (
        <>
          <Grid item xs={6}>
            <MediaWiki generalSiteInfo={generalSiteInfo} />
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
              generalSiteInfo={generalSiteInfo}
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
              generalSiteInfo={generalSiteInfo}
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
        </>
      ) : (
        <Grid item xs={6}>
          Contacting MediaWiki API...
          <LinearProgress />
          Just a moment &mdash; and if we're hangin' here, your MediaWiki might
          be down. :(
          <br />
          In that case, here's a friend:
          <Box>
            <Typography color="primary">
              <code>
                user@server:~/mediawiki-manager$ sudo docker logs -f
                mediawiki_canasta
              </code>
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default Home
