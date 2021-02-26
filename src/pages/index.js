import React from "react"
import { Grid, Box, Chip } from "@material-ui/core"
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
import MediaWikiInfo from "../components/MediaWikiInfo"
import ShortTextIcon from "@material-ui/icons/ShortText"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  logStack: { height: "100px", overflowY: "scroll", fontFamily: "monospace" },
}))

const Home = () => {
  const classes = useStyles()
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
      addToLogStack(Date.now(), res.data.status)
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
      addToLogStack(Date.now(), res.data.status)
    })
  }, [])

  React.useEffect(() => {
    getExtensionsOverview()
    getGeneralSiteInfo()
    axios.get(`${process.env.API_URL}?action=extensionCatalogue`).then(res => {
      setExtensionCatalogue(res.data.extensionCatalogue)
      addToLogStack(Date.now(), res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=appCatalogue`).then(res => {
      setAppCatalogue(res.data.appCatalogue)
      addToLogStack(Date.now(), res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=upgradesCatalogue`).then(res => {
      setUpgradesCatalogue(res.data.upgradesCatalogue)
      addToLogStack(Date.now(), res.data.status)
    })
    axios.get(`${process.env.API_URL}?action=extensionsByMWAPI`).then(res => {
      setExtensionsByMWAPI(res.data.extensionsByMWAPI)
      addToLogStack(Date.now(), res.data.status)
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
    addToLogStack(
      Date.now(),
      "Managing extension " + { currentExtensionName } + "..."
    )
    axios
      .get(
        `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${currentExtensionName}`
      )
      .then(res => {
        getExtensionsOverview()
        addToLogStack(Date.now(), res.data.status)
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
    //     addToLogStack(Date.now(), JSON.stringify(res.data.status))
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  const takeSnapshot = () => {
    addToLogStack(Date.now(), "Taking snapshot...")
    axios
      .get(`${process.env.API_URL}?action=takeSnapshot`)
      .then(res => {
        addToLogStack(Date.now(), res.data.status)
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
    addToLogStack(Date.now(), "Upgrading now...")
    axios
      .get(`${process.env.API_URL}?action=upgradeNow`)
      .then(res => {
        getGeneralSiteInfo()
        addToLogStack(Date.now(), res.data.status)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const logStackRef = React.useRef({})
  const addToLogStack = (timestamp, item) => {
    setLogStack(logStack => [
      ...logStack,
      {
        ts: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(timestamp),
        item: item,
      },
    ])
  }

  React.useEffect(() => {
    logStackRef.current.scrollTop = logStackRef.current.scrollHeight
  }, [logStack])

  return (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <Help />
        <Box mt={2}>
          <Chip label="Log" icon={<ShortTextIcon />} />
          <Box ref={logStackRef} ml={2} mt={1} className={classes.logStack}>
            {logStack.map(item => {
              return (
                <div key={item.ts + item.item}>
                  {item.ts}: {item.item}
                </div>
              )
            })}
          </Box>
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
