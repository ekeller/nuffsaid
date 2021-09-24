import React, { useState } from 'react';
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
import Layout from './layout/Layout'
import CssBaseline from '@material-ui/core/CssBaseline';
import SnackBarAlert from './components/snack-bar/SnackBarAlert';

const App: React.FC<{}> = () => {
  const [errorMessages, setErrorMessages] = useState<Message[]>([]);
  const [warningMessages, setWarningMessages] = useState<Message[]>([]);
  const [infoMessages, setInfoMessages] = useState<Message[]>([]);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [paused, setPaused] = useState(false);
  const [buttonText, setButtonText] = useState('STOP');

  const clearAllMessages = () => {
    setErrorMessages([]);
    setWarningMessages([]);
    setInfoMessages([]);
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    // console.log(reason);
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarVisible(false);
  };

  useEffect(() => {
    if (!paused) {
      const cleanUp = generateMessage((message: Message) => {
        const handleMessageByPriority = {
          '0': () => {
            setErrorMessages(currrentMessages => [message, ...currrentMessages])
            setSnackBarMessage(message.message);
            setSnackBarVisible(true)
          },
          '1': () => setWarningMessages(currrentMessages => [message, ...currrentMessages]),
          '2': () => setInfoMessages(currrentMessages => [message, ...currrentMessages]),
        };

        handleMessageByPriority[message.priority]();
      });
      return cleanUp;
    }
  }, [setErrorMessages, setWarningMessages, setInfoMessages, paused]);

  return (
    <>
      <CssBaseline />
      <Layout
        errors={errorMessages}
        warnings={warningMessages}
        infos={infoMessages}
        setErrorMessages={setErrorMessages}
        setWarningMessages={setWarningMessages}
        setInfoMessages={setInfoMessages}
        setPaused={setPaused}
        paused={paused}
        buttonText={buttonText}
        setButtonText={setButtonText}
        clearAllMessages={clearAllMessages}
      />
      <SnackBarAlert
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarVisible}
        onClose={() => handleClose}
        message={snackBarMessage}
        setSnackBarVisible={setSnackBarVisible}
      />
    </>
  );
}

export default App;
