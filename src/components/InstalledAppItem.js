import React from "react"
import { TableCell, TableRow, Typography, Link } from "@material-ui/core"

export default function InstalledAppItem({ data }) {
  return (
    <>
      <TableRow style={{ backgroundColor: "beige" }}>
        <TableCell>
          <Typography variant="h6">{data[0]}</Typography>
        </TableCell>
        <TableCell>
          <Link href={data[1]}>{data[1]}</Link>
        </TableCell>
      </TableRow>
    </>
  )
}
