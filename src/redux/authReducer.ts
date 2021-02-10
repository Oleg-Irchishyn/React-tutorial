import { authAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { InferActionsTypes } from "./redux-store";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'; /*правильное указание типа, чтобы не повторился тип SET_USER_DATA в других редьюсерах*/
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null
}

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      }
    case GET_CAPTCHA_URL_SUCCESS:
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
      type: SET_USER_DATA,
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
      type: GET_CAPTCHA_URL_SUCCESS,
      data: {
        captchaUrl
      }
    } as const
  )
}



export const getAuthUserdata = () => async (dispatch: any) => {
  let response = await authAPI.authMe();
  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = response.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => { /*с async - await*/
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