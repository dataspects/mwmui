import React from "react"
import {
  Typography,
  Button,
  Box,
  Chip,
  Modal,
  LinearProgress,
} from "@material-ui/core"
import ShortTextIcon from "@material-ui/icons/ShortText"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
const useStyles = makeStyles(theme => ({
  logStack: {
    height: "100px",
    overflowY: "scroll",
    fontFamily: "monospace",
    fontSize: "8px",
  },
  modalLog: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll",
    top: "100px",
    right: "10px",
    left: "20%",
    bottom: "10px",
  },
}))
const Log = ({ logStackRef, logStack, systemIsBusy }) => {
  const classes = useStyles()

  const [logFile, setLogFile] = React.useState("")
  const [logContent, setLogContent] = React.useState("")

  const [modalLogOpen, setModalLogOpen] = React.useState(false)

  const handleModalLogOpen = () => {
    axios.get(`${process.env.API_URL}?action=viewLog`).then(res => {
      setLogFile(res.data.file)
      setLogContent(res.data.content)
      setModalLogOpen(true)
    })
  }

  const handleModalLogClose = () => {
    setModalLogOpen(false)
  }
  return (
    <>
      <Chip label="Log" icon={<ShortTextIcon />} />{" "}
      <Button onClick={handleModalLogOpen} size="small">
        View entire log
      </Button>
      <Modal open={modalLogOpen} onClose={handleModalLogClose}>
        <div className={classes.modalLog}>
          <Typography variant="h5" gutterBottom>
            Log
          </Typography>
          ({logFile})<pre>{logContent}</pre>
        </div>
      </Modal>
      <Box ref={logStackRef} ml={2} mt={1} className={classes.logStack}>
        {logStack.length > 0 &&
          logStack.map(item => {
            return <div key={item}>{item}</div>
          })}
        {systemIsBusy ? <LinearProgress /> : <></>}
      </Box>
    </>
  )
}

export default Log
