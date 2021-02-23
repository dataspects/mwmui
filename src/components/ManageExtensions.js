import React from "react"
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core"

export default function ManageExtensions({
  handleEnableDisableExtension,
  handleExtensionName,
  currentExtensionName,
  extensionCatalogue,
}) {
  return (
    <>
      <h2>Manage extensions</h2>
      <form onSubmit={handleEnableDisableExtension}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box mb={1}>
              <FormControl style={{ minWidth: "100%" }}>
                <InputLabel id="select-exn">Extension Name</InputLabel>
                <Select
                  labelId="select-exn"
                  id="exn"
                  value={currentExtensionName}
                  onChange={handleExtensionName}
                >
                  {extensionCatalogue.map(ext => {
                    return (
                      <MenuItem key={ext.name} value={ext.name}>
                        {ext.name}
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
              <FormLabel component="legend">Mode</FormLabel>
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
