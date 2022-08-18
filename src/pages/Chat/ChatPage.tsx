import { message } from 'antd';
import React from 'react';

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
  const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log('CLOSE WS');
      setTimeout(createChannel, 3000);
    };
    function createChannel() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws?.addEventListener('close', closeHandler);
      setWsChannel(ws);
    }

    createChannel();

    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, []);

  React.useEffect(() => {}, [wsChannel]);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  React.useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };
    wsChannel?.addEventListener('message', messageHandler);

    return () => {
      wsChannel?.removeEventListener('message', messageHandler);
    };
  }, [wsChannel]);

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = React.useState<string>('');
  const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending');

  React.useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready');
    };
    wsChannel?.addEventListener('open', openHandler);

    return () => {
      wsChannel?.removeEventListener('open', openHandler);
    };
  }, [wsChannel]);

  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel!.send(message);
    setMessage('');
  };
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
