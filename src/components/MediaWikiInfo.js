import React from "react"
import { Link, Paper, LinearProgress, Box } from "@material-ui/core"

export default function MediaWikiInfo({ generalSiteInfo }) {
  const show = [
    "generator",
    "phpversion",
    "base",
    "sitename",
    "dbtype",
    "dbversion",
    "maxuploadsize",
    "time",
    "timezone",
    "mainpage",
    "timeoffset",
  ].sort()
  return (
    <Paper>
      {generalSiteInfo ? (
        <>
          <Box p={2}>
            <img
              src="images/mediawiki.png"
              alt="mediawiki"
              style={{ float: "right" }}
            />
          </Box>
          <Box p={3}>
            <table>
              <tbody>
                {show.map(aspect => {
                  if (
                    typeof generalSiteInfo[aspect] === "string" &&
                    generalSiteInfo[aspect].startsWith("http")
                  ) {
                    generalSiteInfo[aspect] = (
                      <Link href={generalSiteInfo[aspect]}>
                        {generalSiteInfo[aspect]}
                      </Link>
                    )
                  }
                  return (
                    <tr key={aspect}>
                      <td>{aspect}</td>
                      <td>{generalSiteInfo[aspect]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Box>
        </>
      ) : (
        <LinearProgress />
      )}
    </Paper>
  )
}
