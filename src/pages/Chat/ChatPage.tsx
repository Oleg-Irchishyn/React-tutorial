import { message } from 'antd';
import React from 'react';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number | string;
  userName: string;
};

const ChatPage: React.FC = () => {
  return <Chat />;
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  React.useEffect(() => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    });
  }, []);
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {messages.map((m: ChatMessageType, index) => (
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
  const [message, setMessage] = React.useState('');
  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel.send(message);
    setMessage('');
  };
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
