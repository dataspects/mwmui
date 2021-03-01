import React from "react"
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Link,
  Chip,
  Modal,
  Typography,
} from "@material-ui/core"
import AppsIcon from "@material-ui/icons/Apps"
import Apps from "../components/Apps"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  modal: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll",
    top: "100px",
    right: "10px",
    left: "20%",
    bottom: "10px",
  },
}))

export default function AppStore({
  handleManageApp,
  handleAppName,
  currentAppName,
  appCatalogue,
  installedApps,
  getInstalledApps,
  generalSiteInfo,
}) {
  const classes = useStyles()
  const [modalInstalledAppsOpen, setModalInstalledAppsOpen] = React.useState(
    false
  )

  const handleModalInstalledAppsOpen = () => {
    getInstalledApps()
    setModalInstalledAppsOpen(true)
  }

  const handleModalInstalledAppsClose = () => {
    setModalInstalledAppsOpen(false)
  }
  return (
    <>
      <h2>
        <AppsIcon color="primary" /> App Store{" "}
        <Chip
          label={"Check installed apps..."}
          onClick={handleModalInstalledAppsOpen}
          variant="outlined"
        />
      </h2>
      <Modal
        open={modalInstalledAppsOpen}
        onClose={handleModalInstalledAppsClose}
      >
        <div className={classes.modal}>
          <Typography variant="h5" gutterBottom>
            dataspects Apps currently installed on {generalSiteInfo.base}
          </Typography>
          <Apps installedApps={installedApps} />
        </div>
      </Modal>
      <p>
        The app store is managed by MWStake's App Vetting Group.{" "}
        <Link href="https://github.com/dataspects/mediawiki-manager/blob/main/catalogues/apps.json">
          See current apps catalogue.
        </Link>
      </p>
      <form onSubmit={handleManageApp}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box mb={1}>
              <FormControl style={{ minWidth: "100%" }}>
                <InputLabel id="select-exn">Select app</InputLabel>
                <Select
                  labelId="select-exn"
                  id="exn"
                  value={currentAppName}
                  onChange={handleAppName}
                >
                  {appCatalogue &&
                    Object.keys(appCatalogue).map(key => {
                      return (
                        <MenuItem key={key} value={appCatalogue[key].name}>
                          {appCatalogue[key].name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Execute
            </Button>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <RadioGroup name="mode" defaultValue="disable">
                <FormControlLabel
                  value="enable"
                  control={<Radio />}
                  label="enable (install)"
                />
                <FormControlLabel
                  value="disable"
                  control={<Radio />}
                  label="disable"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
