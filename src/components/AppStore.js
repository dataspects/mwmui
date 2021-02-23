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
} from "@material-ui/core"

export default function AppStore({
  handleManageApp,
  handleAppName,
  currentAppName,
  appCatalogue,
}) {
  return (
    <>
      <h2>
        App Store (<i>pending</i>)
      </h2>
      <p>
        The app store is managed by MWStake's App Vetting Group.{" "}
        <a href="https://github.com/dataspects/mediawiki-manager/blob/main/catalogues/apps.json">
          See current apps catalogue.
        </a>
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
                  {Object.keys(appCatalogue).map(key => {
                    return (
                      <MenuItem key={key} value={key}>
                        {key}
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
