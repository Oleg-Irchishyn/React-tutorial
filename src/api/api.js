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
  }
}

export const authAPI = {
  authMe: () => {
    return instance.get(`auth/me`).then(response => {
      return response.data;
    });
  }
}

export const followAPI = {
  toggleFollow: (id) => {
    return instance.post(`/follow/` + id).then(response => {
      return response.data;
    });
  },
  toggleUnfollow: (id) => {
    return instance.delete(`/follow/` + id).then(response => {
      return response.data;
    });
  }
}
