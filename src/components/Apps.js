import React from "react"
import { Typography } from "@material-ui/core"
import MUIDataTable from "mui-datatables"
import InstalledAppItem from "./InstalledAppItem"

export default function Apps({ installedApps, generalSiteInfo }) {
  const options = {
    tableBodyHeight: "100%",
    selectableRows: "none",
    searchOpen: true,
    customRowRender: (data, dataIndex, rowIndex) => {
      return (
        <React.Fragment key={rowIndex}>
          <InstalledAppItem data={data} />
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
      name: "dataspectsRepositoryURL",
      label: "dataspects Repository URL",
      options: {
        filter: false,
        sort: false,
      },
    },
  ]
  const getTable = () => {
    if (installedApps) {
      try {
        return (
          <>
            <img
              src="/images/dataspects.png"
              alt="dataspects"
              style={{ width: "50px", float: "right" }}
            />
            <Typography variant="h5" gutterBottom>
              dataspects Apps currently installed on {generalSiteInfo.base}
            </Typography>
            <MUIDataTable
              columns={columns}
              // FIXME
              data={installedApps}
              options={options}
            />
          </>
        )
      } catch {
        //FIXME
        console.log()
        return ""
      }
    }
  }
  return getTable()
}
