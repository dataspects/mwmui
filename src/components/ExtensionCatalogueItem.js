import React from "react"
import {
  TableCell,
  Button,
  TableRow,
  Typography,
  Box,
  Chip,
  Link,
} from "@material-ui/core"

export default function ExtensionCatalogueItem({ data }) {
  return (
    <>
      <TableRow style={{ backgroundColor: "beige" }}>
        <TableCell>
          <Typography variant="h6">{data[0]}</Typography>
          {data[4].length === 0 ? (
            <Button variant="contained" color="primary" size="small">
              Install now...
            </Button>
          ) : (
            <>
              <Button disabled variant="outlined" color="primary" size="small">
                Installed
              </Button>
              <Typography variant="caption" display="block">
                Version {data[4].version}
                <br />
                <Link href={data[4].url}>{data[4].url}</Link>
              </Typography>
            </>
          )}
        </TableCell>
        <TableCell>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "10px",
              width: "200px",
            }}
          >
            {JSON.stringify(data[1], null, 2)}
          </pre>
        </TableCell>
        <TableCell>
          {data[2].map(v => {
            return (
              <Box m={1} key={v}>
                <Chip variant="outlined" label={v} />
              </Box>
            )
          })}
        </TableCell>
        <TableCell>
          {
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "10px",
              }}
            >
              {JSON.stringify(data[5], null, 2)}
            </pre>
          }
        </TableCell>
      </TableRow>
      <TableRow size="small">
        <TableCell colSpan={4}>
          {
            <ul>
              {data[3].map(v => {
                return (
                  <li key={v}>
                    <Link href={v}>{v}</Link>
                  </li>
                )
              })}
            </ul>
          }
        </TableCell>
      </TableRow>
    </>
  )
}
