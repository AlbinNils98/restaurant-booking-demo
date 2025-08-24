import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { type Dispatch, type SetStateAction } from 'react';

type ConfirmDialogProps = {
  text: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void;
  onAbort: () => void;
}

const ConfirmDialog = ({ text, open, setOpen, onConfirm, onAbort }: ConfirmDialogProps) => {

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleConfirm = () => {
    toggleOpen();
    onConfirm();
  }

  const handleAbort = () => {
    toggleOpen();
    onAbort();
  }

  return (
    <Dialog
      open={open}
      onClose={() => { }}
      disableEscapeKeyDown
    >
      <DialogTitle>{text}</DialogTitle>
      <DialogContent>
        <Typography>Please choose an option before continuing:</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>
          Confirm
        </Button>
        <Button onClick={handleAbort}>
          Abort
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;