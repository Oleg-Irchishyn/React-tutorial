
import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Textarea } from '../common/Preloader/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../redux/utils/validators/validators';
import { initialStateType } from '../../redux/dialogsReducer';

type ownProps = {
  dialogsPage: initialStateType,
  sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

type NewMessageFormOwnProps = {};

type NewMessageFormTypeKeys = Extract<keyof NewMessageFormValuesType  , string>;

const Dialogs: React.FC<ownProps> = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

  let addNewMessage = (values: NewMessageFormValuesType ) => {
    props.sendMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, NewMessageFormOwnProps  > & NewMessageFormOwnProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField<NewMessageFormTypeKeys>("Enter your message", "newMessageBody", Textarea, [required, maxLength50])}
      </div>
      <div><button>Send</button></div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, NewMessageFormOwnProps>({
  form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs;