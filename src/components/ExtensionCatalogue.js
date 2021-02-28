import React from "react"
import { Grid, Typography, Link } from "@material-ui/core"
import MUIDataTable from "mui-datatables"
import ExtensionCatalogueItem from "./ExtensionCatalogueItem"

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
          src="/ui/images/mwstake.png"
          alt="MWStake"
          style={{ width: "50px", float: "right" }}
        />
        <Typography variant="h5" gutterBottom>
          MediaWiki Stakeholders Group Certified Extensions Catalogue
        </Typography>
        <Typography variant="body1">
          MWStake curates the following collection of extensions with regard to:
        </Typography>
        <ul>
          <li>compatibility with MediaWiki and other extensions</li>
          <li>stability</li>
          <li>documentation</li>
        </ul>
        <Typography variant="caption" gutterBottom>
          The current source is{" "}
          <Link href="https://github.com/dataspects/mediawiki-manager/blob/main/catalogues/extensions.json">
            https://github.com/dataspects/mediawiki-manager/blob/main/catalogues/extensions.json
          </Link>
          .
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {getTable()}
      </Grid>
      <Typography variant="caption" gutterBottom>
        CodeTags: LEX2102271141
      </Typography>
    </Grid>
  )
}
