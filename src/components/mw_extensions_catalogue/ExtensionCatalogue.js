import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"
import axios from "axios"
import DataspectsSearchMainAutocompleteInput from "./dataspects_core/DataspectsSearchMainAutocompleteInput"
import DataspectsSearchResults from "./DataspectsSearchResults"
import MWStakeExtensionCatalogueSearchResult from "./MWStakeExtensionCatalogueSearchResult"
import DSRStyles from "./DataspectsSearch.module.css"

export default function ExtensionCatalogue(extensionCatalogue) {
  const [currentpagenumber, setcurrentpagenumber] = React.useState(1)
  const [typeAheadString, setTypeAheadString] = React.useState("")
  const [searchResults, setSearchResults] = React.useState({})
  const [numerOfSERsPerPage] = React.useState(10)
  const [returnSERsFrom, setReturnSERsFrom] = React.useState(0)
  // Move to lib!
  const isBrowser = () => typeof window !== `undefined`
  const executeSearch = React.useCallback(
    value => {
      axios
        .post(`${process.env.DSAPI_URL}/search`, {
          queryString: value,
          from: returnSERsFrom,
          size: numerOfSERsPerPage,
          explain: false,
          profile: false,
          facetingStack: {
            // LEX2103071128
            ds0__namespace: {
              filterInTokenShould: [
                // {
                //   token: "https://mwstake.org/mwstake/wiki/",
                //   timestamp: 1592566981965,
                // },
                {
                  token: "//www.mediawiki.org/wiki/",
                  timestamp: 1592566981965,
                },
              ],
            },
          },
        })
        .then(res => {
          if (isBrowser()) {
            window.scrollTo(0, 0)
          }
          setSearchResults(res)
        })
        .catch(error => {
          console.error(error)
        })
    },
    [returnSERsFrom, numerOfSERsPerPage]
  )

  const newSearchQueryString = React.useCallback(
    value => {
      executeSearch(value)
    },
    [executeSearch]
  )

  const paginate = (event, pageNumber) => {
    setReturnSERsFrom((pageNumber - 1) * numerOfSERsPerPage)
    setcurrentpagenumber(pageNumber)
    executeSearch()
  }
  const showThesePredicateNames = [
    // "mw0__HasTemplate",
    "mw0__HasCategory",
    "mw0__HasSection",
    "mwo1__HasExtensionStatus",
    // "mw1__HasExternalLink",
    // "mw0__HasInternalLink",
  ]
  return (
    <Grid container>
      <Grid item xs={12}>
        <img
          src="/images/mwstake.png"
          alt="MWStake"
          style={{ width: "50px", float: "right", verticalAlign: "middle" }}
        />
        <Typography variant="h5" gutterBottom>
          Certified Extensions Catalogue
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <DataspectsSearchMainAutocompleteInput
          newSearchQueryString={newSearchQueryString}
          setTypeAheadString={setTypeAheadString}
          label="Search extensions..."
          showDataspectsSearchLink={true}
        />
      </Grid>
      <Grid item xs={5}>
        <Box p={1}>
          <div className={DSRStyles.devComment}>
            This search is run against dataspects' index alias "anonymous" under
            constraints specified in the facetingStack, see code tag
            LEX2103071128.
          </div>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DataspectsSearchResults
          resultComponents={[MWStakeExtensionCatalogueSearchResult]}
          searchResults={searchResults}
          currentpagenumber={currentpagenumber}
          paginate={paginate}
          showThesePredicateNames={showThesePredicateNames}
        />
      </Grid>
    </Grid>
  )
}
