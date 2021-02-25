import React from "react"
import { Grid, Paper, LinearProgress, Chip, Box } from "@material-ui/core"
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
  const [logOutput, setLogOutput] = React.useState("Log output...")

  const getGeneralSiteInfo = React.useCallback(() => {
    axios.get(`${process.env.API_URL}?action=generalSiteInfo`).then(res => {
      setGeneralSiteInfo(res.data.generalSiteInfo)
      setLogOutput(res.data.status)
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
      setLogOutput(res.data.status)
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
    axios.get(`${process.env.API_URL}?action=upgradesCatalogue`).then(res => {
      setUpgradesCatalogue(res.data.upgradesCatalogue)
      setLogOutput(res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=extensionsByMWAPI`).then(res => {
      setExtensionsByMWAPI(res.data.extensionsByMWAPI)
      setLogOutput(res.data.status)
    })
    getGeneralSiteInfo()
    getSnapshotsCatalogue()
  }, [getExtensionsOverview, getSnapshotsCatalogue, getGeneralSiteInfo])

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

  const takeSnapshot = () => {
    setLogOutput(
      <>
        <span>Taking snapshot...</span>
        <LinearProgress />
      </>
    )
    axios
      .get(`${process.env.API_URL}?action=takeSnapshot`)
      .then(res => {
        setLogOutput(res.data.status)
        getSnapshotsCatalogue()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [tabValue, setTabValue] = React.useState(1)
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
    setLogOutput(
      <>
        <span>Upgrading now...</span>
        <LinearProgress />
      </>
    )
    axios
      .get(`${process.env.API_URL}?action=upgradeNow`)
      .then(res => {
        getGeneralSiteInfo()
        setLogOutput(res.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Chip label="Log Output" />
        <Box m={2}>
          <Paper>{logOutput}</Paper>
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
            <Tab label="Upgrades" />
            <Tab label="Extensions" />
            <Tab label="Apps" />
            <Tab label="Snapshots (Backups)" />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
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
        <TabPanel value={tabValue} index={2}>
          <Apps apps={{}} />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          Item One
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default Home
