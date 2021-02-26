import React from "react"
import { Grid, Typography } from "@material-ui/core"
import axios from "axios"

export default function ExtensionCatalogue() {
  const [extensionCatalogue, setExtensionCatalogue] = React.useState([])
  React.useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/dataspects/mediawiki-manager/main/catalogues/extensions.json`
      )
      .then(res => {
        setExtensionCatalogue(res.data)
      })
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <img
          src="/images/mwstake.png"
          alt="MWStake"
          style={{ width: "50px", float: "right" }}
        />
        <Typography variant="h5">
          MediaWiki Stakeholders Group Certified Extensions Catalogue
        </Typography>
        <pre>{JSON.stringify(extensionCatalogue, null, 2)}</pre>
      </Grid>
    </Grid>
  )
}
