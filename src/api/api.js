import *as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "debbd9e5-51f4-44e1-b1d8-ad026688cc54"
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`,
      {
        withCredentials: true
      }).then(response => {
        return response.data;
      });
  }
}

export const profileAPI = {
  getProfile: (userId) => {
    return instance.get(`profile/` + userId).then(response => {
      return response.data;
    });
  },
  getStatus: (userId) => {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus: (status) => {
    return instance.put(`profile/status/`, { status: status });
  },
  savePhoto: (image) => {
    const formData = new FormData();
    formData.append("image", image)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfile: (profile) => {
    return instance.put(`profile`, profile);
  }
}

export const authAPI = {
  authMe: () => {
    return instance.get(`auth/me`);
  },
  login: (email, password, rememberMe = false) => {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout: () => {
    return instance.delete(`auth/login`);
  }
}

export const followAPI = {
  toggleFollow: (userId) => {
    return instance.post(`follow/` + userId).then(response => {
      return response.data;
    });
  },
  toggleUnFollow: (userId) => {
    return instance.delete(`follow/` + userId).then(response => {
      return response.data;
    });
  }
}


