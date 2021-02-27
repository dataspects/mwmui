import React from "react"
import {
  Chip,
  Box,
  Button,
  Grid,
  Typography,
  Link,
  TableCell,
  TableRow,
} from "@material-ui/core"
import MUIDataTable from "mui-datatables"

export default function ExtensionCatalogue(extensionCatalogue) {
  const options = {
    tableBodyHeight: "500px",
    selectableRows: "none",
    searchOpen: true,
    customRowRender: (data, dataIndex, rowIndex) => {
      return (
        <React.Fragment key={rowIndex}>
          <TableRow style={{ backgroundColor: "beige" }}>
            <TableCell>{data[0]}</TableCell>
            <TableCell>{data[1]}</TableCell>
            <TableCell>{data[2]}</TableCell>
            <TableCell>{data[4]}</TableCell>
          </TableRow>
          <TableRow size="small">
            <TableCell colSpan={4}>{data[3]}</TableCell>
          </TableRow>
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
        customBodyRender: value => {
          return (
            <>
              <Typography variant="h6">{value}</Typography>
              <Button variant="contained" color="primary" size="small">
                Install now...
              </Button>
            </>
          )
        },
      },
    },
    {
      name: "requires",
      label: "Requires",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "10px",
                width: "200px",
              }}
            >
              {JSON.stringify(value, null, 2)}
            </pre>
          )
        },
      },
    },
    {
      name: "categories",
      label: "Categories",
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return value.map(v => {
            return (
              <Box m={1} key={v}>
                <Chip variant="outlined" label={v} />
              </Box>
            )
          })
        },
      },
    },
    {
      name: "documentation",
      label: "Documentation",
      options: {
        filter: false,
        display: "excluded",
        sort: false,
        customBodyRender: value => {
          return (
            <ul>
              {value.map(v => {
                return (
                  <li key={v}>
                    <Link href={v}>{v}</Link>
                  </li>
                )
              })}
            </ul>
          )
        },
      },
    },
    {
      name: "installation-aspects",
      label: "Installation Aspects",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "10px",
              }}
            >
              {JSON.stringify(value, null, 2)}
            </pre>
          )
        },
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
