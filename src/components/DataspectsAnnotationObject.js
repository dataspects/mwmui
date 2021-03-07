import React from "react"
import { Link } from "@material-ui/core"

const DataspectsAnnotationObject = ({ annotation }) => {
  if (annotation.object.startsWith("http")) {
    return <Link href={annotation.object}>{annotation.object}</Link>
  }
  return annotation.object
}

export default DataspectsAnnotationObject
