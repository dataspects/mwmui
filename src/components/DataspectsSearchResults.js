import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Box, Grid } from "@material-ui/core"
import { Pagination } from "@material-ui/lab"
import MWStakeExtensionCatalogueSearchResult from "./MWStakeExtensionCatalogueSearchResult"

const styles = {
  viewControlButton: {
    padding: "0px 3px 0px 3px",
  },
  SERsSectionHeader: {
    backgroundColor: "beige",
    padding: "5px",
    marginBottom: "5px",
  },
  mqMatches: {
    fontStyle: "italic",
  },
}

const DataspectsSearchResults = ({
  resultComponents, // Idea
  searchResults,
  numberOfSERPages,
  paginate,
  currentpagenumber,
}) => {
  const injectSERsSectionHeader = ser => {
    if (ser.isFirstSEROfNewMatchSection) {
      return { __html: ser._matchedQueries.join(", ") + "<hr/>" }
    }
  }

  const getSER = ser => {
    return <MWStakeExtensionCatalogueSearchResult ser={ser} />
  }

  if (searchResults.data) {
    return (
      <>
        <Grid item xs={12}>
          <Box my={3}>
            Page {currentpagenumber} of {searchResults.data.total} results (
            {searchResults.data.took} milliseconds) from{" "}
            <b>{searchResults.data.indexAlias}</b>
            <sup title="LEX2008201445">?</sup>
          </Box>
          {searchResults.data.results.map(ser => (
            <div key={ser._id}>
              <div dangerouslySetInnerHTML={injectSERsSectionHeader(ser)} />
              {getSER(ser)}
            </div>
          ))}
          <Pagination
            count={numberOfSERPages}
            onChange={paginate}
            page={currentpagenumber}
            defaultPage={1}
          />
        </Grid>
      </>
    )
  } else {
    return <></>
  }
}

export default withStyles(styles)(DataspectsSearchResults)
