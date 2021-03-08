import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  Box,
  Typography,
} from "@material-ui/core"
import DSRStyles from "./DataspectsSearch.module.css"

export default function ExtensionProfile({ annotations }) {
  // console.log(JSON.stringify(annotations, null, 2))
  return (
    <Grid container item spacing={5}>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            title="Categories"
            titleTypographyProps={{ variant: "overline" }}
          />
          <CardContent>
            {annotations.map(a => {
              if (a.predicate === "mw0__HasCategory") {
                return (
                  <Box
                    key={a.object}
                    m={0.5}
                    component="span"
                    className={DSRStyles.epChip}
                  >
                    <Chip label={a.object} size="small" />
                  </Box>
                )
              }
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            title="Sections"
            titleTypographyProps={{ variant: "overline" }}
          />
          <CardContent>
            {annotations.map(a => {
              if (a.predicate === "mw0__HasSection") {
                return (
                  <Box
                    key={a.object}
                    m={0.5}
                    component="span"
                    className={DSRStyles.epChip}
                  >
                    <Chip
                      label={a.object}
                      size="small"
                      className={DSRStyles[a.predicate]}
                    />
                  </Box>
                )
              }
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
