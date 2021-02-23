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

export default function ExtensionStore({
  handleManageExtension,
  handleExtensionName,
  currentExtensionName,
  extensionCatalogue,
}) {
  return (
    <>
      <h2>Extension Store</h2>
      <p>
        The extensions store is managed by MWStake's Extensions Vetting Group.
      </p>
      <form onSubmit={handleManageExtension}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box mb={1}>
              <FormControl style={{ minWidth: "100%" }}>
                <InputLabel id="select-exn">Select extension</InputLabel>
                <Select
                  labelId="select-exn"
                  id="exn"
                  value={currentExtensionName}
                  onChange={handleExtensionName}
                >
                  {Object.keys(extensionCatalogue).map(key => {
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
          <Grid item xs={8}>
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
