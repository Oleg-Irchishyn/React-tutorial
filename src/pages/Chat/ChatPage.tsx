import React from 'react';
import { ChatMessageType } from '../../api/chat-api';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chatReducer';
import { appStateType } from '../../redux/redux-store';

const ChatPage: React.FC = () => {
  return <Chat />;
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: appStateType) => state.chat.messages);

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {messages.map((m: ChatMessageType, index: number) => (
        <Message key={`${index}_${m.userName}`} message={m} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img style={{ width: '80px', borderRadius: '50%' }} src={message!.photo} alt="image_photo" />
      <b>{message!.userName}</b>
      <br />
      <p>{message!.message}</p>
      <hr />
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending');

  const dispatch = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button disabled={false} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
