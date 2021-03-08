import React from "react"
import DataspectsEntityAnnotationRow from "./DataspectsEntityAnnotationRow"

const DataspectsEntityAnnotations = ({ ser, showThesePredicateNames }) => {
  if (ser.annotations.length > 0) {
    return (
      <>
        {ser.annotations.map(function (annot) {
          if (showThesePredicateNames.includes(annot.predicate)) {
            // LEX2004180655
            return (
              <DataspectsEntityAnnotationRow
                key={annot.predicate + annot.object}
                annotation={annot}
              />
            )
          }
          return null
        })}
      </>
    )
  }
  return null
}

export default DataspectsEntityAnnotations
