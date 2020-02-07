import React, { Component } from 'react';
import Dialogs from './Dialogs';
import { updatedNewMessageBodyCreator, sendMessageCreator } from "../../redux/dialogsReducer";

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  }

  let onNewMessageChange = (body) => {
    props.store.dispatch(updatedNewMessageBodyCreator(body));
  }

  return (
    <Dialogs updateNewMessageBody={onNewMessageChange} 
    sendMessage={onSendMessageClick}
    dialogsPage={state}/>
  )
}

export default DialogsContainer;