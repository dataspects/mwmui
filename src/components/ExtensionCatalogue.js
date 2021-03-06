import React from "react"
import { Grid, Typography } from "@material-ui/core"
import MUIDataTable from "mui-datatables"
import ExtensionCatalogueItem from "./ExtensionCatalogueItem"
import DataspectsSearch from "./DataspectsSearch"

export default function ExtensionCatalogue(extensionCatalogue) {
  const options = {
    tableBodyHeight: "100%",
    selectableRows: "none",
    searchOpen: true,
    customRowRender: (data, dataIndex, rowIndex) => {
      return (
        <React.Fragment key={rowIndex}>
          <ExtensionCatalogueItem data={data} />
        </React.Fragment>
      )
    },
  }

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "requires",
      label: "Requires",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "categories",
      label: "Categories",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "documentation",
      options: {
        display: "excluded",
      },
    },
    {
      name: "isInstalled",
      options: {
        display: "excluded",
      },
    },
    {
      name: "installation-aspects",
      label: "Installation Aspects",
      options: {
        filter: false,
        sort: false,
      },
    },
  ]

  const getTable = () => {
    if (extensionCatalogue) {
      try {
        return (
          <MUIDataTable
            columns={columns}
            // FIXME
            data={extensionCatalogue.extensionCatalogue}
            options={options}
          />
        )
      } catch {
        //FIXME
        console.log()
        return ""
      }
    }
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
        {/* {getTable()} */}
        <DataspectsSearch />
      </Grid>
    </Grid>
  )
}
