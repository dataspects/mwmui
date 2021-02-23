import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function ComposerjsonReq({ composerjsonReq }) {
  return (
    <>
      <h2>Required by composer.json</h2>
      {composerjsonReq && Object.keys(composerjsonReq).length > 0 ? (
        <ul>
          {Object.keys(composerjsonReq).map(key => {
            return <li key={composerjsonReq[key]}>{composerjsonReq[key]}</li>
          })}
        </ul>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
