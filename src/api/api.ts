import axios from 'axios';
import { profileType, usersType, photosType  } from '../types/types';

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

type SavePhotosResponseDataType = {
  photos: photosType
}

type GetCaptchaURlResponseType = {
url: string
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
    return instance.get<profileType>(`profile/` + userId).then(response => {
      return response.data;
    });
  },
  getStatus: (userId: number) => {
    return instance.get<string>(`profile/status/` + userId).then(response => {
      return response.data;
    });
  },
  updateStatus: (status: string) => {
    return instance.put<ResponseType>(`profile/status/`, { status: status }).then(response => {
      return response.data;
    });
  },
  savePhoto: (image: File) => {
    const formData = new FormData();
    formData.append("image", image)
    return instance.put<ResponseType<SavePhotosResponseDataType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then (response => response.data);
  },
  saveProfile: (profile: profileType) => {
    return instance.put<ResponseType<profileType>>(`profile`, profile);
  }
}

export const authAPI = {
  authMe: () => {
    return instance.get<ResponseType<MeResponseDataType, ResultCodesEnum>>(`auth/me`).then(response => response.data);
  },
  login: (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) => {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum  | ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
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
    return instance.get<GetCaptchaURlResponseType>(`security/get-captcha-url`).then(response => response.data);
  }
}



