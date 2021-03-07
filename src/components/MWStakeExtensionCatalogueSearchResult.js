import React from "react"
import { Grid, Link, Typography, Box } from "@material-ui/core"
import DSRStyles from "./DataspectsSearch.module.css"
import DataspectsEntityAnnotations from "./DataspectsEntityAnnotations"

export default function MWStakeExtensionCatalogueSearchResult({
  ser,
  showThesePredicateNames,
}) {
  const highlightedEntityTypeAndTitle = ser => {
    return {
      __html: ser.hasEntityType + ' "' + ser.highlight.hasEntityTitle + '"',
    }
  }
  return (
    <Grid container item spacing={0} className={DSRStyles.serRoot}>
      <Grid item xs={12}>
        <Typography variant="h6" underline="none">
          <img
            src="/images/mwstake.png"
            alt="MWStake"
            style={{ height: "20px", verticalAlign: "middle" }}
          />{" "}
          <Link href={ser.hasEntityURL}>
            <span
              dangerouslySetInnerHTML={highlightedEntityTypeAndTitle(ser)}
            ></span>
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12} className={DSRStyles.hasEntityURL}>
        <Box py={0}>
          <Typography variant="subtitle1">{ser.hasEntityURL}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {ser.highlight.hasEntityContentTEXT}
      </Grid>
      <Grid item container xs={12}>
        <DataspectsEntityAnnotations
          ser={ser}
          showThesePredicateNames={showThesePredicateNames}
        />
      </Grid>
    </Grid>
  )
}
