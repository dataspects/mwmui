import React from "react"
import { Grid, Typography } from "@material-ui/core"
import DataspectsSearchMainAutocompleteInput from "./DataspectsSearchMainAutocompleteInput"

export default function ExtensionCatalogue(extensionCatalogue) {
  const [typeAheadString, setTypeAheadString] = React.useState("")
  const newSearchQueryString = value => {}
  return (
    <Grid container>
      <Grid item xs={12}>
        <img
          src="/images/mwstake.png"
          alt="MWStake"
          style={{ width: "50px", float: "right", verticalAlign: "middle" }}
        />
        <Typography variant="h5" gutterBottom>
          MediaWiki Stakeholders Group
          <br />
          Certified Extensions Catalogue
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DataspectsSearchMainAutocompleteInput
          newSearchQueryString={newSearchQueryString}
          setTypeAheadString={setTypeAheadString}
          label="Search extensions..."
          showDataspectsSearchLink={true}
        />
      </Grid>
    </Grid>
  )
}
