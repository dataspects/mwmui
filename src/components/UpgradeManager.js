import React from "react"
import { Button, Chip, Box } from "@material-ui/core"
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"

export default function UpgradeManager({ upgradesCatalogue, generalSiteInfo }) {
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
          <th>Package Name</th>
          <th>What's new?</th>
          <th>Actions</th>
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
                  <pre>
                    {JSON.stringify(upgradesCatalogue[key].comment, null, 2)}
                  </pre>
                </td>
                <td>
                  <Box p={1}>
                    <Button variant="outlined" color="primary" type="submit">
                      Check changes
                    </Button>
                  </Box>
                  <Box p={1}>
                    <Button variant="contained" color="primary" type="submit">
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
