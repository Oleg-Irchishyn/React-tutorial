const SEND_MESSAGE = 'SEND_MESSAGE';

type dialogsType = {
  id: number,
  name: string
}

type messagesType = {
  id: number,
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Sasha' },
    { id: 5, name: 'Viktor' },
    { id: 6, name: 'Valera' }
  ] as Array<dialogsType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is yout it-kamasutra?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' }
  ] as Array<messagesType>
}

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }]
      };
    default:
      return state;
  }
}

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;