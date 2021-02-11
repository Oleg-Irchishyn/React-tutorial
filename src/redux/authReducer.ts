import { authAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Action } from "redux";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null
}

export type initialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
type ActionsTypes = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case 'SN/auth/SET_USER_DATA':
      return {
        ...state,
        ...action.data
      }
    case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {
      type: 'SN/auth/SET_USER_DATA',
      data: {
        userId,
        email,
        login,
        isAuth
      }
    } as const
  ),
  getCaptchaUrlSuccess: (captchaUrl: string)  => (
    {
      type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
      data: {
        captchaUrl
      }
    } as const
  )
}

export const getAuthUserdata = (): ThunkType => async (dispatch) => {
  let response = await authAPI.authMe();
  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = response.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserdata())
  }
  else {
    if (response.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl);
    }
    let message = response.messages.length > 0 ? response.messages[0] : "Some error"
    dispatch(stopSubmit("login", { _error: message }));
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = ():ThunkType => async (dispatch: any) => { /*с async - await*/
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
}

/* с коллбэком then
export const logout = () => (dispatch) => { 
  authAPI.logout()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
}
*/

export default authReducer;