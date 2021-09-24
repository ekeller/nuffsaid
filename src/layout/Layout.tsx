import React, { useEffect } from 'react';
import s from './Layout.module.scss';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import BasicCard from '../components/cards';
import { Message } from '../Api';
import { Divider } from '@material-ui/core';
// import { GridSpacing } from '@material-ui/core/Grid';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert, { AlertProps } from '@material-ui/core/Alert';

import {ReactComponent as NSLogo} from '../img/logo.svg';

type LayoutProps = {
  errors: Message[];
  warnings: Message[];
  infos: Message[];
  setErrorMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setWarningMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInfoMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  paused: boolean;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  buttonText: string;
  clearAllMessages: () => void;
}

const Layout = (
  {
    errors,
    warnings,
    infos,
    setErrorMessages,
    setWarningMessages,
    setInfoMessages,
    setPaused,
    paused,
    setButtonText,
    buttonText,
    clearAllMessages,
  }: LayoutProps) => {
  useEffect(() => {
    setButtonText(paused ? 'START' : 'STOP')
  }, [paused, setButtonText])

  const handleOnClose = (index: number, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    setMessages(currentMessages => {
      currentMessages.splice(index, 1)
      return [...currentMessages];
    })
  }

  return (
    <div className={s.container}>
      <Typography variant="h4" component="div" className={s.header}>
        <NSLogo /> Coding Challenge
      </Typography>
      <Divider variant="middle" className={s.hr} />
      <div style={{ width: '100%', padding: '10px 0 40px', textAlign: 'center'}}>
        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: '#88FCA3', color: '#000000de'}} onClick={() => setPaused(!paused)}>
          {buttonText}
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#88FCA3', color: '#000000de'}} onClick={clearAllMessages}>
          CLEAR
        </Button>
      </div>
      <div className={s.grid}>
        <div>
          <Typography variant="h6" component="div">
            Error Type 1
          </Typography>
          <Typography variant="caption" component="div">
            Count {errors?.length}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" component="div">
            Warning Type 2
          </Typography>
          <Typography variant="caption" component="div">
            Count {warnings?.length}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" component="div">
            Info Type 3
          </Typography>
          <Typography variant="caption" component="div">
            Count {infos?.length}
          </Typography>
        </div>
        <div className={`${s.gridError} ${s.gridListing}`}>
          {errors?.map?.((msg, i) => <BasicCard key={i} content={msg?.message} className={s.card} onClick={() => handleOnClose(i, setErrorMessages)} />)}
        </div>
        <div className={`${s.gridWarning} ${s.gridListing}`}>
          {warnings?.map?.((msg, i) => <BasicCard key={msg?.message} content={msg?.message} className={s.card} onClick={() => handleOnClose(i, setWarningMessages)} />)}
        </div>
        <div className={`${s.gridInfo} ${s.gridListing}`}>
          {infos?.map?.((msg, i) => <BasicCard key={msg?.message} content={msg?.message} className={s.card} onClick={() => handleOnClose(i, setInfoMessages)} />)}
        </div>
      </div>
    </div>
  )
}

export default Layout
