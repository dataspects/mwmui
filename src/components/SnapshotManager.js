import React from "react"
import { Button } from "@material-ui/core"
import BackupIcon from "@material-ui/icons/Backup"

export default function SnapshotManager({ snapshotCatalogue, takeSnapshot }) {
  return (
    <>
      <h2>
        <BackupIcon color="primary" /> Snapshot Manager
      </h2>
      <Button variant="contained" color="primary" onClick={takeSnapshot}>
        Take snapshot
      </Button>
      <pre style={{ whiteSpace: "pre-line" }}>
        {snapshotCatalogue.join("\n")}
      </pre>
    </>
  )
}
