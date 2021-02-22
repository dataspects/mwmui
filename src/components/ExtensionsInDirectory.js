import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function ExtensionsInDirectory({ extensionsInDirectory }) {
  return (
    <>
      <h2>Extensions in Directory</h2>
      {extensionsInDirectory &&
      Object.keys(extensionsInDirectory).length > 0 ? (
        <ul>
          {Object.keys(extensionsInDirectory).map(key => {
            return (
              <li key={extensionsInDirectory[key]}>
                {extensionsInDirectory[key]}
              </li>
            )
          })}
        </ul>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
