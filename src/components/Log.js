import React from "react"
import { Typography, Button, Box, Chip, Modal } from "@material-ui/core"
import ShortTextIcon from "@material-ui/icons/ShortText"
import { makeStyles } from "@material-ui/core/styles"
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
    right: "100px",
    left: "100px",
    bottom: "100px",
  },
}))
const Log = ({ logStackRef, logStack }) => {
  const classes = useStyles()
  const [modalLogOpen, setModalLogOpen] = React.useState(false)

  const handleModalLogOpen = () => {
    setModalLogOpen(true)
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
        </div>
      </Modal>
      <Box ref={logStackRef} ml={2} mt={1} className={classes.logStack}>
        {logStack.map(item => {
          return (
            <div key={item.ts + item.item}>
              {item.ts}: {item.item}
            </div>
          )
        })}
      </Box>
    </>
  )
}

export default Log
