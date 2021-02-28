import React from "react"
import { Grid, Box, Paper } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import axios from "axios"
import ExtensionsInDirectory from "../components/ExtensionsInDirectory"
import ComposerjsonReq from "../components/ComposerjsonReq"
import WfLoadExtensions from "../components/WfLoadExtensions"
import ExtensionsByMWAPI from "../components/ExtensionsByMWAPI"
import Apps from "../components/Apps"
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
    axios.get(`${process.env.API_URL}?action=extensionsByMWAPI`).then(res => {
      setExtensionsByMWAPI(res.data.extensionsByMWAPI)
      addToLogStack(res.data.status)
    })
    getSnapshotsCatalogue()
  }, [getExtensionsOverview, getSnapshotsCatalogue, getGeneralSiteInfo])

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
        `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
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
    // const { mode } = event.currentTarget.elements
    // axios
    //   .get(
    //     `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
    //   )
    //   .then(res => {
    //     addToLogStack(JSON.stringify(res.data.status))
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
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

  const [tabValue, setTabValue] = React.useState(0)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const TabPanel = props => {
    const { children, value, index, ...other } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    )
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
      <Grid item xs={12}>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Extensions" />
            <Tab label="Apps" />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <ExtensionsByMWAPI extensionsByMWAPI={extensionsByMWAPI} />
            </Grid>
            <Grid item xs={3}>
              <ComposerjsonReq composerjsonReq={composerjsonReq} />
            </Grid>
            <Grid item xs={3}>
              <WfLoadExtensions wfLoadExtensions={wfLoadExtensions} />
            </Grid>
            <Grid item xs={3}>
              <ExtensionsInDirectory
                extensionsInDirectory={extensionsInDirectory}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Apps apps={{}} />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default Home
