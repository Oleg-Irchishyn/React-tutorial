import React from 'react';
import Dialogs from './Dialogs';
import { updatedNewMessageBodyCreator, sendMessageCreator } from "../../redux/dialogsReducer";
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    updateNewMessageBody: (body) => {
      dispatch(updatedNewMessageBodyCreator(body));
    }
  }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;
