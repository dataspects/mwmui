import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function ComposerjsonReq({ composerjsonReq }) {
  return (
    <>
      <p>Required by composer.json</p>
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
