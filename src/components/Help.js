import React from "react"
import { Box, Link } from "@material-ui/core"

export default function Help() {
  return (
    <>
      <b>Current features</b>:
      <ol>
        <li>
          Interacts solely with /w and api.php and can therefore be installed
          alongside any existing MW
          <br />
          (no extensions involved)
        </li>
        <li>Enable (install) and disable extensions</li>
        <li>
          Take <Link href="https://restic.net/">restic</Link> backups
        </li>
        <li>Upgrade to new certified/vetted packages</li>
      </ol>
      <b>Planned features</b>: install/enable/disable ontologies, idempotency,
      rollbacks, cloning, smart upgrades (i.e.{" "}
      <i style={{ backgroundColor: "lightgreen" }}>
        only suggest what works with your system profile
      </i>
      )
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
      </Box>
    </>
  )
}
