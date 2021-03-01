import React from "react"

export default function Apps({ installedApps }) {
  return (
    <>
      <p>Apps</p>
      <pre>{JSON.stringify(installedApps, null, 2)}</pre>
    </>
  )
}
