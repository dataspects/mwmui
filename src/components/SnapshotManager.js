import React from "react"
import { Button, LinearProgress, Paper, Box } from "@material-ui/core"
import BackupIcon from "@material-ui/icons/Backup"

export default function SnapshotManager({ snapshotCatalogue, takeSnapshot }) {
  return (
    <>
      <Paper style={{ float: "right" }}>
        <Box p={3}>
          <img
            src="images/restic.png"
            alt="restic"
            style={{ height: "100px" }}
          />
          <br />
          Backups by <a href="https://restic.net/">restic</a>
        </Box>
      </Paper>
      <h2>
        <BackupIcon color="primary" /> Snapshot Manager{" "}
      </h2>
      <Button variant="contained" color="primary" onClick={takeSnapshot}>
        Take snapshot
      </Button>
      {snapshotCatalogue.length > 0 ? (
        <pre style={{ whiteSpace: "pre-line" }}>
          {snapshotCatalogue.join("\n")}
        </pre>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
