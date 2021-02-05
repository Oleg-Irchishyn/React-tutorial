import axios from 'axios';
import { profileType, usersType } from '../types/types';

const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "debbd9e5-51f4-44e1-b1d8-ad026688cc54"
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export type GetItemsType = {
  items: Array<usersType>,
  totalCount: number,
  error: string | null
}

export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`,
      {
        withCredentials: true
      }).then(response => {
        return response.data;
      });
  }
}

export const profileAPI = {
  getProfile: (userId: number) => {
    return instance.get(`profile/` + userId).then(response => {
      return response.data;
    });
  },
  getStatus: (userId: number) => {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus: (status: string) => {
    return instance.put(`profile/status/`, { status: status });
  },
  savePhoto: (image: any) => {
    const formData = new FormData();
    formData.append("image", image)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfile: (profile: profileType) => {
    return instance.put(`profile`, profile);
  }
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10
}

type ResponseType<Data = {}, ResCode = ResultCodesEnum> = {
  data: Data,
  messages: Array<string>,
  resultCode: ResCode
}

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  authMe: () => {
    return instance.get<ResponseType<MeResponseDataType, ResultCodesEnum>>(`auth/me`).then(response => response.data);
  },
  login: (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) => {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
  },
  logout: () => {
    return instance.delete(`auth/login`);
  }
}

export const followAPI = {
  toggleFollow: (userId: number) => {
    return instance.post<ResponseType>(`follow/` + userId).then(response => {
      return response.data;
    });
  },
  toggleUnFollow: (userId: number) => {
    return instance.delete(`follow/` + userId).then(response =>  response.data) as Promise<ResponseType>;
  }
}


export const securityAPI = {
  getCaptchaUrl: () => {
    return instance.get(`security/get-captcha-url`);
  }
}



