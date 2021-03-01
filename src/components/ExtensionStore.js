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
  Modal,
  Chip,
  Avatar,
} from "@material-ui/core"
import ExtensionCatalogue from "../components/ExtensionCatalogue"
import ExtensionIcon from "@material-ui/icons/Extension"
import { makeStyles } from "@material-ui/core/styles"
import ExtensionsInDirectory from "../components/ExtensionsInDirectory"
import ComposerjsonReq from "../components/ComposerjsonReq"
import WfLoadExtensions from "../components/WfLoadExtensions"
import ExtensionsByMWAPI from "../components/ExtensionsByMWAPI"

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

export default function ExtensionStore({
  handleManageExtension,
  handleExtensionName,
  currentExtensionName,
  extensionCatalogue,
  extensionsByMWAPI,
  composerjsonReq,
  wfLoadExtensions,
  extensionsInDirectory,
  getExtensionsOverview,
  getExtensionsByMWAPI,
}) {
  const classes = useStyles()

  const [
    modalExtensionCatalogueOpen,
    setModalExtensionCatalogueOpen,
  ] = React.useState(false)

  const handleModalExtensionCatalogueOpen = () => {
    getExtensionsOverview()
    getExtensionsByMWAPI()
    setModalExtensionCatalogueOpen(true)
  }

  const handleModalExtensionCatalogueClose = () => {
    setModalExtensionCatalogueOpen(false)
  }

  const [
    modalInstalledExtensionsOpen,
    setModalInstalledExtensionsOpen,
  ] = React.useState(false)

  const handleModalInstalledExtensionsOpen = () => {
    setModalInstalledExtensionsOpen(true)
  }

  const handleModalInstalledExtensionsClose = () => {
    setModalInstalledExtensionsOpen(false)
  }

  return (
    <>
      <h2>
        <ExtensionIcon color="primary" /> Extension Store{" "}
        <Chip
          label={"View MWStake Certified Extensions Catalogue..."}
          onClick={handleModalExtensionCatalogueOpen}
          avatar={<Avatar alt="MWStake" src="/images/mwstake.png" />}
          variant="outlined"
          color="primary"
        />{" "}
        <Chip
          label={"Check installed extensions..."}
          onClick={handleModalInstalledExtensionsOpen}
          variant="outlined"
        />
      </h2>
      <Modal
        open={modalExtensionCatalogueOpen}
        onClose={handleModalExtensionCatalogueClose}
      >
        <div className={classes.modal}>
          <ExtensionCatalogue extensionCatalogue={extensionCatalogue} />
        </div>
      </Modal>
      <Modal
        open={modalInstalledExtensionsOpen}
        onClose={handleModalInstalledExtensionsClose}
      >
        <div className={classes.modal}>
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
        </div>
      </Modal>
      <form onSubmit={handleManageExtension}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box mb={1}>
              <FormControl style={{ minWidth: "100%" }}>
                <InputLabel id="select-exn">Select extension</InputLabel>
                <Select
                  labelId="select-exn"
                  id="exn"
                  value={currentExtensionName}
                  onChange={handleExtensionName}
                >
                  {extensionCatalogue &&
                    Object.keys(extensionCatalogue).map(key => {
                      return (
                        <MenuItem
                          key={key}
                          value={extensionCatalogue[key].name}
                        >
                          {extensionCatalogue[key].name}
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
