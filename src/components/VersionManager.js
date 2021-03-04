import React from "react"
import { Paper, Button, Chip, LinearProgress } from "@material-ui/core"
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"

export default function VersionManager({
  upgradesCatalogue,
  generalSiteInfo,
  handleUpgradeNow,
}) {
  return (
    <>
      <h2>
        <SystemUpdateAltIcon color="primary" /> Version Manager
      </h2>
      {upgradesCatalogue ? (
        <>
          <p>
            You are currently running <b>{generalSiteInfo.generator}</b>. For
            MWM version 1 follow these steps to upgrade:
          </p>
          <Paper elevation={3}>
            <ol>
              <li>
                Edit{" "}
                <b>
                  <code>docker-compose.yml > services > mediawiki > image</code>
                </b>{" "}
                and set it to{" "}
                <b>
                  <code>dataspects/mediawiki:1.35.1-2103040820</code>
                </b>
              </li>
              <li>
                Run <code>./restart.sh</code>
              </li>
            </ol>
          </Paper>
          <table>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>What's new?</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(upgradesCatalogue).map(key => {
                return (
                  <tr key={upgradesCatalogue[key].name}>
                    <td>
                      <Chip
                        label={upgradesCatalogue[key].name}
                        variant="outlined"
                        color="primary"
                        icon={<CloudDownloadIcon />}
                      />
                    </td>
                    <td>
                      <div
                        style={{ overflow: "scroll", whiteSpace: "pre-wrap" }}
                      >
                        {JSON.stringify(
                          upgradesCatalogue[key].comment,
                          null,
                          2
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Button variant="outlined" color="primary" disabled>
            Check changes
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpgradeNow}
            disabled
          >
            Upgrade now
          </Button>
        </>
      ) : (
        <>
          <LinearProgress />
          <p>
            Just a moment &mdash; and if we're hangin' here, there is a problem
            obtaining the upgrades catalogue. :(
          </p>
        </>
      )}
    </>
  )
}
