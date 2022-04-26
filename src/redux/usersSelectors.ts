import { createSelector } from "reselect";
import { appStateType } from "./redux-store";

export const getAllUsers = (state: appStateType) => {
  return state.usersPage.users;
}

export const getPageSize = (state: appStateType) => {
  return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: appStateType) => {
  return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: appStateType) => {
  return state.usersPage.currentPage;
}

export const getIsFetching = (state: appStateType) => {
  return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: appStateType) => {
  return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state: appStateType) => {
  return state.usersPage.filter;
}

/*Selectors, created by reselect library*/

export const getAllUsersSelector = createSelector(
  getAllUsers, (users) => {
    return users.filter(u => true);
  }
)
