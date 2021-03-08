import React from "react"
import { TextField, Link } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import axios from "axios"
import { makeStyles } from "@material-ui/core/styles"

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

/*

  <DataspectsSearch /> uses 2 functions which are implemented here:

    1.  typeahead:      which looks up and sets the typeahead options
    2.  triggerSearch:  which triggers the upstream search for a
                        newSearchQueryString


  Here are the props that need to be implemented upstream and passed into
  <DataspectsSearch <props...> />:

    1.  currentSearchQueryString: an upstream state (REFACTOR!)

    2.  newSearchQueryString:     an upstream function

    3.  setTypeAheadString:       an upstream state setting function

*/

export default function DataspectsSearchMainAutocompleteInput({
  newSearchQueryString,
  setTypeAheadString,
  label,
  showDataspectsSearchLink,
}) {
  const classes = useStyles()

  const [searchQueryString, setSearchQueryString] = React.useState("")

  const [options, setOptions] = React.useState([])

  const triggerSearch = (event, value) => {
    if (value != null) {
      newSearchQueryString(value)
    }
  }
  const typeahead = (event, value) => {
    if (value !== "") {
      setTypeAheadString(value)
      axios
        .post(`${process.env.DSAPI_URL}/search/_typeahead`, {
          queryString: value,
        })
        .then(res => {
          setOptions(
            res.data.typeAheadBuckets.map(function (bucket) {
              if (!bucket) {
                return { name: "" }
              } else {
                return { name: bucket.key }
              }
            })
          )
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <div style={{ textAlign: "right" }}>
      <Autocomplete
        freeSolo
        id="queryString"
        onInputChange={typeahead}
        disableClearable
        onChange={triggerSearch}
        value={searchQueryString}
        noOptionsText="No options"
        options={options.map(option => option.name)}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            data-cy="searchQueryStringTextField"
            onKeyPress={ev => {
              if (ev.key === "Enter") {
                ev.preventDefault()
                triggerSearch(ev, searchQueryString)
              }
            }}
          />
        )}
      />
      {showDataspectsSearchLink ? (
        <Link href="https://dataspects.com">
          <span className={classes.dataspectsSB}>Search by</span>
          <img
            src="/images/dataspects.png"
            alt="Search by dataspects"
            className={classes.dataspectsLogo}
          />
        </Link>
      ) : (
        <></>
      )}
    </div>
  )
}
