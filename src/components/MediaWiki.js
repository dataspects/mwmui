import React from "react"
import { Link, LinearProgress, Box, AppBar, Tabs, Tab } from "@material-ui/core"
import axios from "axios"
import { makeStyles } from "@material-ui/core/styles"
import SettingsIcon from "@material-ui/icons/Settings"
import InfoIcon from "@material-ui/icons/Info"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabHeight: {
    height: "400px",
    overflowY: "scroll",
  },
  tabIcon: { float: "right" },
}))

export default function MediaWiki({ generalSiteInfo }) {
  const classes = useStyles()
  const show = [
    "generator",
    "phpversion",
    "base",
    "sitename",
    "dbtype",
    "dbversion",
    "maxuploadsize",
    "time",
    "timezone",
    "mainpage",
    "timeoffset",
  ].sort()

  const TabPanel = props => {
    const { children, value, index, ...other } = props
    return (
      <div
        className={classes.tabHeight}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    )
  }
  const [value, setValue] = React.useState(0)
  const [systemSettings, setSystemSettings] = React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  React.useEffect(() => {
    axios
      .get(`${process.env.API_URL}?action=systemSettings`)
      .then(res => {
        setSystemSettings(res.data.systemSettings)
      })
      .catch(err => {})
  }, [])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="MediaWiki Info" icon={<InfoIcon />} />
          <Tab label="MediaWiki Settings" icon={<SettingsIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {generalSiteInfo ? (
          <>
            <img
              src="images/mediawiki.png"
              alt="mediawiki"
              className={classes.tabIcon}
            />
            <table>
              <tbody>
                {show.map(aspect => {
                  if (
                    typeof generalSiteInfo.data.query.general[aspect] ===
                      "string" &&
                    generalSiteInfo.data.query.general[aspect].startsWith(
                      "http"
                    )
                  ) {
                    generalSiteInfo.data.query.general[aspect] = (
                      <Link href={generalSiteInfo.data.query.general[aspect]}>
                        {generalSiteInfo.data.query.general[aspect]}
                      </Link>
                    )
                  }
                  return (
                    <tr key={aspect}>
                      <td>{aspect}</td>
                      <td>{generalSiteInfo.data.query.general[aspect]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        ) : (
          <LinearProgress />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <img
          src="images/mediawiki.png"
          alt="mediawiki"
          className={classes.tabIcon}
        />
        <pre>{JSON.stringify(systemSettings, null, 2)}</pre>
      </TabPanel>
    </div>
  )
}
