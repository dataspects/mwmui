import { createMuiTheme } from "@material-ui/core/styles"
import { blue } from "@material-ui/core/colors"

/*
  [[IsThingToDevelop::dataspects MUI Theme]]
  [[IsTaskForMilestone::Version 1]]
  // QLEX2009091216: Test
*/

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        td: {
          verticalAlign: "top",
          padding: "0px 50px 0px 0px",
          textAlign: "left",
        },
        th: {
          textAlign: "left",
          padding: "0px 0px 10px 0px",
        },
      },
    },
    MuiLink: {
      // See "Rule name" at https://material-ui.com/api/link/#css
      root: {
        color: "#1a0dab",
      },
    },
  },
  typography: {
    button: {
      textTransform: "uppercase", // Default, but for learning
    },
  },
})

export default theme
