import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

function Modal(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const { tittle, section, yesText, cancelText } = props;

  useEffect(() => {
    setOpenModal(props.open);
  }, [props]);
  const handleClose = () => {
    props.onCancel();
  };
  const handleOpen = () => {
    props.onYes();
  };
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{tittle}</DialogTitle>
        <DialogContent>
            <div>{section}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button onClick={handleOpen} autoFocus>
            {yesText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;
