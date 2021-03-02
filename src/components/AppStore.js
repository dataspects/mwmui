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
  Avatar,
} from "@material-ui/core"
import AppsIcon from "@material-ui/icons/Apps"
import Apps from "./Apps"
import AppsCatalogue from "./AppsCatalogue"
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

  const [modalAppsCatalogueOpen, setModalAppsCatalogueOpen] = React.useState(
    false
  )

  const handleModalAppsCatalogueOpen = () => {
    setModalAppsCatalogueOpen(true)
  }

  const handleModalAppsCatalogueClose = () => {
    setModalAppsCatalogueOpen(false)
  }

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
        <AppsIcon color="primary" /> App Store
        <Box m={1}>
          <Chip
            label={"View Apps Catalogue..."}
            onClick={handleModalAppsCatalogueOpen}
            avatar={
              <Avatar alt="MWStake" src="/ui/images/dataspectsavatar.png" />
            }
            variant="outlined"
          />
        </Box>
        <Box m={1}>
          <Chip
            label={"Check installed apps..."}
            onClick={handleModalInstalledAppsOpen}
            avatar={
              <Avatar alt="MWStake" src="/ui/images/dataspectsavatar.png" />
            }
            variant="outlined"
          />
        </Box>
      </h2>
      <Modal
        open={modalAppsCatalogueOpen}
        onClose={handleModalAppsCatalogueClose}
      >
        <div className={classes.modal}>
          <AppsCatalogue appCatalogue={appCatalogue} />
        </div>
      </Modal>
      <Modal
        open={modalInstalledAppsOpen}
        onClose={handleModalInstalledAppsClose}
      >
        <div className={classes.modal}>
          <Apps
            installedApps={installedApps}
            generalSiteInfo={generalSiteInfo}
          />
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
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
