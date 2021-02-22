import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function WfLoadExtensions({ wfLoadExtensions }) {
  return (
    <>
      <h2>wfLoadExtensions</h2>
      {Object.keys(wfLoadExtensions).length > 0 ? (
        <ul>
          {Object.keys(wfLoadExtensions).map(key => {
            return <li>{wfLoadExtensions[key]}</li>
          })}
        </ul>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
