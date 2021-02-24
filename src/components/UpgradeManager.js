import React from "react"
import {} from "@material-ui/core"
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt"

export default function UpgradeManager({ upgradesCatalogue }) {
  return (
    <div style={{ overflow: "scroll" }}>
      <h2>
        <SystemUpdateAltIcon color="primary" /> Upgrade Manager
      </h2>
      <pre>{JSON.stringify(upgradesCatalogue, null, 2)}</pre>
    </div>
  )
}
