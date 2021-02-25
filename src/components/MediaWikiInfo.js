import React from "react"
import { Paper } from "@material-ui/core"

export default function MediaWikiInfo({ generalSiteInfo }) {
  const show = [
    "generator",
    "phpversion",
    "base",
    "sitename",
    "dbtype",
    "dbversion",
    "maxuploadsize",
  ].sort()
  return (
    <Paper>
      <table>
        <tbody>
          {show.map(aspect => {
            return (
              <tr key={generalSiteInfo[aspect]}>
                <td>{aspect}</td>
                <td>{generalSiteInfo[aspect]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Paper>
  )
}
