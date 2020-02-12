import React, { Component } from 'react';
import Dialogs from './Dialogs';
import { updatedNewMessageBodyCreator, sendMessageCreator } from "../../redux/dialogsReducer";
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
   dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      updateNewMessageBody: () => {
        dispatch(sendMessageCreator());
      },
      sendMessage: (body) => {
        dispatch(updatedNewMessageBodyCreator(body));
      }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;