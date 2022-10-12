let subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status));
};

const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
  console.error('REFRESH PAGE');
};

const closeHandler = () => {
  console.log('CLOSE WS');
  notifySubscribersAboutStatus('pending');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach((s) => s(newMessages));
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
  ws?.close();
};

function createChannel() {
  cleanUp();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubscribersAboutStatus('pending');
  ws?.addEventListener('close', closeHandler);
  ws?.addEventListener('message', messageHandler);
  ws?.addEventListener('open', openHandler);
  ws?.addEventListener('error', errorHandler);
}

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

type EventsNamesType = 'messages-received' | 'status-changed';
export type StatusType = 'pending' | 'ready' | 'error';

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number | string;
  userName: string;
};
