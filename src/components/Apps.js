import React from "react"
import MUIDataTable from "mui-datatables"
import InstalledAppItem from "./InstalledAppItem"

export default function Apps({ installedApps }) {
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
          <MUIDataTable
            columns={columns}
            // FIXME
            data={installedApps}
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
    <>
      <p>Apps</p>
      {getTable()}
    </>
  )
}
