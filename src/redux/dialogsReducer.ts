import { InferActionsTypes } from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {

  switch (action.type) {
    case 'SN/dialogs/SEND_MESSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }]
      };
    default:
      return state;
  }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  sendMessage: (newMessageBody: string) => ({ type: 'SN/dialogs/SEND_MESSAGE', newMessageBody } as const)
}

export default dialogsReducer;