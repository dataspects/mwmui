import React from "react"
import { TableCell, TableRow, Typography } from "@material-ui/core"

export default function AppsCatalogueItem({ data }) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography variant="h6">{data[0]}</Typography>
        </TableCell>
        <TableCell>
          {
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "10px",
              }}
            >
              {JSON.stringify(data[1], null, 2)}
            </pre>
          }
        </TableCell>
      </TableRow>
    </>
  )
}
