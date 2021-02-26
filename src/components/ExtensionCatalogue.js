import React from "react"
import { Grid, Typography } from "@material-ui/core"
import AceEditor from "react-ace"

export default function ExtensionCatalogue(mwstakeExtensionCatalogue) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <img
          src="/images/mwstake.png"
          alt="MWStake"
          style={{ width: "50px", float: "right" }}
        />
        <Typography variant="h5" gutterBottom>
          MediaWiki Stakeholders Group Certified Extensions Catalogue
        </Typography>
        <Typography variant="body1">
          MWStake curates the following collection of extensions with regard to:
        </Typography>
        <ul>
          <li>compatibility with MediaWiki and other extensions</li>
          <li>stability</li>
          <li>documentation</li>
        </ul>
        <AceEditor
          mode="json"
          width="100%"
          theme="github"
          value={JSON.stringify(mwstakeExtensionCatalogue, null, 2)}
          editorProps={{
            $blockScrolling: true,
          }}
          setOptions={{
            showLineNumbers: true,
            useWorker: false,
          }}
        />
      </Grid>
    </Grid>
  )
}
