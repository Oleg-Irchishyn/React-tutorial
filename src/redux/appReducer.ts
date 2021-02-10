import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getAuthUserdata } from "./authReducer";
import { InferActionsTypes, appStateType} from "./redux-store";


let initialState = {
  initialized: false
}

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;


const appReducer = (state = initialState, action: ActionsTypes ): initialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}

const actions = {
  initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = ()  => (dispatch :any) => {
  let promise = dispatch(getAuthUserdata());
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializedSuccess());
    })
}

export default appReducer;