import React from "react"
import { Button, Chip, Box } from "@material-ui/core"
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"

export default function UpgradeManager({
  upgradesCatalogue,
  generalSiteInfo,
  handleUpgradeNow,
}) {
  return (
    <>
      <h2>
        <SystemUpdateAltIcon color="primary" /> Upgrade Manager
      </h2>
      <p>
        For your <b>current {generalSiteInfo.generator}</b> and the{" "}
        <b>versions of its currently installed skins and extensions</b>, there
        is the following upgrade available:
      </p>
      <table>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>What's new?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(upgradesCatalogue).map(key => {
            return (
              <tr key={key}>
                <td>
                  <Chip
                    label={key}
                    variant="outlined"
                    color="primary"
                    icon={<CloudDownloadIcon />}
                  />
                </td>
                <td>
                  <div style={{ overflow: "scroll", whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(upgradesCatalogue[key].comment, null, 2)}
                  </div>
                </td>
                <td>
                  <Box p={1}>
                    <Button variant="outlined" color="primary">
                      Check changes
                    </Button>
                  </Box>
                  <Box p={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpgradeNow}
                    >
                      Upgrade now
                    </Button>
                  </Box>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
