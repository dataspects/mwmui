import React from "react"
import { Grid, Typography, Link } from "@material-ui/core"
import MUIDataTable from "mui-datatables"
import AppsCatalogueItem from "./AppsCatalogueItem"

export default function AppsCatalogue(appCatalogue) {
  const options = {
    tableBodyHeight: "100%",
    selectableRows: "none",
    searchOpen: true,
    customRowRender: (data, dataIndex, rowIndex) => {
      return (
        <React.Fragment key={rowIndex}>
          <AppsCatalogueItem data={data} />
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
      name: "installation-aspects",
      label: "Installation Aspects",
      options: {
        filter: false,
        sort: false,
      },
    },
  ]

  const getTable = () => {
    if (appCatalogue) {
      try {
        return (
          <MUIDataTable
            columns={columns}
            // FIXME
            data={appCatalogue.appCatalogue}
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
          src="/images/dataspects.png"
          alt="dataspects"
          style={{ width: "50px", float: "right" }}
        />
        <Typography variant="h5" gutterBottom>
          dataspects Apps Catalogue
        </Typography>
        <Typography variant="caption" gutterBottom>
          The current source is{" "}
          <Link href="https://github.com/dataspects/mediawiki-manager/blob/main/catalogues/apps.json">
            https://github.com/dataspects/mediawiki-manager/blob/main/catalogues/apps.json
          </Link>
          .
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {getTable()}
      </Grid>
    </Grid>
  )
}
