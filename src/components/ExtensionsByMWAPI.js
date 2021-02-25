import React from "react"
import { LinearProgress } from "@material-ui/core"

export default function ExtensionsByMWAPI({ extensionsByMWAPI }) {
  return (
    <>
      <p>extensionsByMWAPI</p>
      {extensionsByMWAPI && Object.keys(extensionsByMWAPI).length > 0 ? (
        <table>
          <tbody>
            {Object.keys(extensionsByMWAPI).map(key => {
              return (
                <tr
                  key={
                    extensionsByMWAPI[key].name +
                    extensionsByMWAPI[key].url +
                    extensionsByMWAPI[key].version
                  }
                >
                  <td>{extensionsByMWAPI[key].type}</td>
                  <td>
                    <a href={extensionsByMWAPI[key].url}>
                      {extensionsByMWAPI[key].name}
                    </a>
                  </td>
                  <td>{extensionsByMWAPI[key].version}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}
