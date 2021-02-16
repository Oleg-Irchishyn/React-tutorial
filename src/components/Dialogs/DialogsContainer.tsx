import React from 'react';
import Dialogs from './Dialogs';
import { actions} from "../../redux/dialogsReducer";
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux'
import { appStateType } from '../../redux/redux-store';

let mapStateToProps = (state: appStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    ...actions
  }),
  withAuthRedirect
)(Dialogs);
