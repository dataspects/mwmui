import React from "react"
import { Tooltip } from "@material-ui/core"
import DataspectsAnnotationObject from "./DataspectsAnnotationObject"
import Grid from "@material-ui/core/Grid"

const AnnotationRow = ({ annotation }) => {
  return (
    <>
      <Grid item xs={12} sm={3}>
        <Tooltip title={annotation.predicateScope}>
          <>{annotation.predicate}</>
        </Tooltip>
      </Grid>
      <Grid item xs={9} sm={8}>
        <DataspectsAnnotationObject annotation={annotation} />
      </Grid>
    </>
  )
}

export default AnnotationRow
