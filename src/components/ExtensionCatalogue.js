import React from "react"
import { Grid, Typography } from "@material-ui/core"
import axios from "axios"
import DataspectsSearchMainAutocompleteInput from "./DataspectsSearchMainAutocompleteInput"
import DataspectsSearchResults from "./DataspectsSearchResults"
import MWStakeExtensionCatalogueSearchResult from "./MWStakeExtensionCatalogueSearchResult"

export default function ExtensionCatalogue(extensionCatalogue) {
  const [typeAheadString, setTypeAheadString] = React.useState("")
  const [searchResults, setSearchResults] = React.useState({})
  // Mobe to lib!
  const isBrowser = () => typeof window !== `undefined`
  const executeSearch = React.useCallback(() => {
    axios
      .post(`${process.env.DSAPI_URL}/search`, {
        queryString: "what",
        from: 0,
        size: 5,
        explain: false,
        profile: false,
        facetingStack: {},
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
  }, [])

  const newSearchQueryString = value => {
    executeSearch()
  }
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
      <Grid item xs={12}>
        <DataspectsSearchResults
          resultComponents={[MWStakeExtensionCatalogueSearchResult]}
          searchResults={searchResults}
        />
      </Grid>
    </Grid>
  )
}
