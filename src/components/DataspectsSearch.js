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

export default function DataspectsSearch() {
  const classes = useStyles()
  const [typeAheadString, setTypeAheadString] = React.useState("")
  const [searchQueryString, setSearchQueryString] = React.useState("")

  const [options, setOptions] = React.useState([])

  const triggerSearch = (event, value) => {
    if (value != null) {
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
          console.log(res)
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
            label="Search extensions..."
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
      <Link href="https://dataspects.com">
        <span className={classes.dataspectsSB}>Search by</span>
        <img
          src="/images/dataspects.png"
          alt="Search by dataspects"
          className={classes.dataspectsLogo}
        />
      </Link>
    </div>
  )
}
