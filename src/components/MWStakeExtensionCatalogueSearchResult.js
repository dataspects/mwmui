import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Link } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  dataspectsSB: {
    fontSize: "13px",
    marginRight: "3px",
  },
  dataspectsLogo: {
    verticalAlign: "middle",
    height: "15px",
  },
}))

export default function MWStakeExtensionCatalogueSearchResult({ ser }) {
  const classes = useStyles()
  console.log(JSON.stringify(ser, null, 2))
  return (
    <Grid container item spacing={0}>
      <Grid item xs={10}>
        <Link href={ser.hasEntityURL}>{ser.hasEntityURL}</Link>
      </Grid>
    </Grid>
  )
}
