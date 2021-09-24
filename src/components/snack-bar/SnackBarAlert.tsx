import React, { Dispatch, SetStateAction } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/core/Alert';

type SnackBarAlertProps = {
  anchorOrigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' | 'right';
  },
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  message: string;
  setSnackBarVisible: Dispatch<SetStateAction<boolean>>;
}

const SnackBarAlert = (
  {
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'center'
    },
  open = false,
  autoHideDuration = 2000,
  onClose,
  message,
  setSnackBarVisible,
}: SnackBarAlertProps) => {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
      props,
      ref,
    ) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      event?.preventDefault();

      if (reason === 'clickaway') {
        return;
      }

      setSnackBarVisible(false);
    };

  return(
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity="error" onClose={() => onClose}>{message}</Alert>
    </Snackbar>
  )
}

export default SnackBarAlert
