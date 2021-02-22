import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function ComposerjsonReq({ composerjsonReq }) {
  return (
    <>
      <h2>Required By composer.json</h2>
      {Object.keys(composerjsonReq).length > 0 ? (
        <ul>
          {Object.keys(composerjsonReq).map(key => {
            return <li>{composerjsonReq[key]}</li>
          })}
        </ul>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
