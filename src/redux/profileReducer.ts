import { postsType, profileType, photosType } from './../types/types';
import { profileAPI } from "../api/api";
import { stopSubmit, FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './redux-store';

const ADD_POST = 'SN/profile/ADD-POST';
const SET_USER_PROFILE = 'SN/profile/SET_USER_PROFILE';
const SET_STATUS = 'SN/profile/SET_STATUS';
const DELETE_POST = 'SN/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SN/profile/SAVE_PHOTO_SUCCESS';


let initialState = {
  posts: [
    { id: 1, message: 'Hi, How are you?', likesCount: 0 },
    { id: 2, message: 'It is my new post', likesCount: 23 },
    { id: 3, message: 'Blabla', likesCount: 8 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ] as Array<postsType>,
  profile: null as profileType | null,
  status: "",
};

export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as profileType
      }
    default:
      return state;
  }
}

export const actions = {
  AddPostActionCreator: (newPostText: string)  => ({ type: ADD_POST, newPostText } as const),
  deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
  setUserProfile: (profile: profileType)  => ({ type: SET_USER_PROFILE, profile } as const),
  setStatus :(status: string) => ({ type: SET_STATUS, status } as const),
  savePhotoSuccess:(photos: photosType)  => ({ type: SAVE_PHOTO_SUCCESS, photos} as const)
}


export const getUserProfile = (userId: number): ThunkType  => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));
  }
}

export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  }
}

export const updateStatus = (status: string): ThunkType  => {
  return async (dispatch) => {
    try {
      let data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    } catch (error) {
      alert(error.message); // тут надо диспатчить ошибку
    }
  }
}


export const savePhoto = (file: File): ThunkType  => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  }
}

export const saveProfile = (profile: profileType) : ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      }
     else {
       throw new Error("userId can't be null")
     }
    }
    else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
      dispatch(stopSubmit("edit-profile", { _error: message }));
      return Promise.reject(response.data.messages[0]);
    }
  }
}



export default profileReducer;