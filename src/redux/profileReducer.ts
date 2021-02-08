import { postsType, profileType, photosType } from './../types/types';
import { profileAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
  posts: [
    { id: 1, message: 'Hi, How are you?', likesCount: 0 },
    { id: 2, message: 'It is my new post', likesCount: 23 },
    { id: 3, message: 'Blabla', likesCount: 8 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ] as Array<postsType>,
  profile: null as profileType | null,
  status: "",
  newPostText: ""
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
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
        newPostText: ""
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

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST,
  newPostText: string
}

type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: profileType
}

type setStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}

type deletePostActionType = {
  type: typeof DELETE_POST,
  postId: number
}

type savePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: photosType
}

export const AddPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });
export const deletePost = (postId: number): deletePostActionType => ({ type: DELETE_POST, postId });
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status: string): setStatusActionType => ({ type: SET_STATUS, status });
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  }
}

export const getStatus = (userId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
  }
}

export const updateStatus = (status: string) => {
  return async (dispatch: any) => {
    try {
      let data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    } catch (error) {
      alert(error.message); // тут надо диспатчить ошибку
    }
  }
}


export const savePhoto = (file: any) => {
  return async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  }
}

export const saveProfile = (profile: any) => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    }
    else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
      dispatch(stopSubmit("edit-profile", { _error: message }));
      return Promise.reject(response.data.messages[0]);
    }
  }
}



export default profileReducer;