import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function WfLoadExtensions({ wfLoadExtensions }) {
  return (
    <>
      <p>wfLoadExtensions</p>
      {wfLoadExtensions && Object.keys(wfLoadExtensions).length > 0 ? (
        <ul>
          {Object.keys(wfLoadExtensions).map(key => {
            return <li key={wfLoadExtensions[key]}>{wfLoadExtensions[key]}</li>
          })}
        </ul>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
