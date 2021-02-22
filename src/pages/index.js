import React from "react"
import {
  Grid,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from "@material-ui/core"
import axios from "axios"
import ExtensionsInDirectory from "../components/ExtensionsInDirectory"
import ComposerjsonReq from "../components/ComposerjsonReq"
import WfLoadExtensions from "../components/WfLoadExtensions"

const Home = () => {
  const [extensionsInDirectory, setExtensionsInDirectory] = React.useState([])
  const [composerjsonReq, setComposerjsonReq] = React.useState([])
  const [wfLoadExtensions, setWfLoadExtensions] = React.useState([])

  React.useEffect(() => {
    axios.get(`${process.env.API_URL}?action=overview`).then(res => {
      setExtensionsInDirectory(res.data.extensionsInDirectory)
      setComposerjsonReq(res.data.composerjsonReq)
      setWfLoadExtensions(res.data.wfLoadExtensions)
    })
  }, [])

  const handleEnableDisableExtension = event => {
    event.preventDefault()
    const { extensionName, mode } = event.currentTarget.elements
    axios
      .get(
        `${process.env.API_URL}?action=enableDisableExtension&mode=${mode.value}&extensionName=${extensionName.value}`
      )
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <p>
          <a href="https://dserver/wiki">Back to my MediaWiki...</a>
        </p>
        <h2>Enable/disable existing extensions</h2>
        <form onSubmit={handleEnableDisableExtension}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box mb={1}>
                <TextField
                  name="extensionName"
                  label="Extension Name"
                  size="small"
                  fullWidth
                />
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Execute
              </Button>
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Mode</FormLabel>
                <RadioGroup name="mode" defaultValue="disable">
                  <FormControlLabel
                    value="enable"
                    control={<Radio />}
                    label="enable"
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
        <h2>Install new extensions</h2>
        <a href="https://packagist.org/explore/?type=mediawiki-extension">
          Browse <b>packagist.org/explore/?type=mediawiki-extension</b>
        </a>
        <h2>App Store</h2>
        <h2>Extension Store</h2>
        <p>
          Extensions catalogue certified/secured e.g. by MWStake's Extensions
          Vetting Group
        </p>
      </Grid>
      <Grid item xs={4}>
        <ExtensionsInDirectory extensionsInDirectory={extensionsInDirectory} />
      </Grid>
      <Grid item xs={4}>
        <ComposerjsonReq composerjsonReq={composerjsonReq} />
      </Grid>
      <Grid item xs={4}>
        <WfLoadExtensions wfLoadExtensions={wfLoadExtensions} />
      </Grid>
    </Grid>
  )
}

export default Home
