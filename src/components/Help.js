import React from "react"
import { Box, Link, Chip } from "@material-ui/core"
import WarningIcon from "@material-ui/icons/Warning"

export default function Help({ runTest }) {
  return (
    <>
      <b>Features</b>:
      <ol>
        <li>No MediaWiki extensions needed</li>
        <li>Enable (install) and disable extensions</li>
        <li>MediaWiki Stakeholders Group Certified Extensions Catalogue</li>
        <li>
          Take <Link href="https://restic.net/">restic</Link> backups
        </li>
        <li>Upgrade MediaWiki (pending: and extensions)</li>
        <li>Logfile</li>
      </ol>
      <b>Planned</b>: install/enable/disable ontologies, idempotency, rollbacks,
      cloning
      <Box mt={2}>
        <img
          src="images/git.png"
          alt="git"
          style={{ height: "20px", verticalAlign: "middle" }}
        />{" "}
        <Link href="https://github.com/dataspects/mediawiki-manager">
          mediawiki-manager
        </Link>
        {" | "}
        <Link href="https://github.com/dataspects/mwmui">mwmui</Link>
        {" | "}
        <Link href="https://github.com/dataspects/mwmapi">mwmapi</Link>
        {" | "}
        <Link href="https://hub.docker.com/u/dataspects">Docker images</Link>
        {" | "}
        <Link href="https://mwstake.org/mwstake/wiki/MWStake_MediaWiki_Manager">
          Project page
        </Link>
      </Box>
      <Box mt={2}>
        <Chip
          label={"Run test..."}
          onClick={runTest}
          variant="outlined"
          icon={<WarningIcon />}
        />{" "}
        see{" "}
        <Link href="https://github.com/dataspects/mediawiki-manager/blob/main/mwmapi/test.php">
          mwmapi/test.php
        </Link>
      </Box>
    </>
  )
}
