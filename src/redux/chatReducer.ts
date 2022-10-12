import { Dispatch } from 'redux';
import { FormAction } from 'redux-form';
import { chatAPI, ChatMessageType, StatusType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'SN/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    case 'SN/chat/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'SN/chat/MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'SN/chat/STATUS_CHANGED',
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }

  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }

  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export type initialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
type ActionsTypes = InferActionsTypes<typeof actions>;

export default chatReducer;
