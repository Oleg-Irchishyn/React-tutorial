import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import {
  getUsers,
  acceptFollow, acceptUnFollow, actions 
} from '../../redux/usersReducer';
import Users from "./Users";
import PreloaderImg from '../common/Preloader/PreloaderImg';
import {
  getAllUsersSelector, getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching, getFollowingInProgress
} from '../../redux/usersSelectors';
import { compose } from 'redux'
import { usersType } from '../../types/types';
import { appStateType } from '../../redux/redux-store';

type MapStatePropTypes = {
  currentPage: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number,
  followingInProgress: Array<number>,
  users: Array<usersType>,
}

type MapDispatchPropTypes = {
  acceptUnFollow: (userId: number) => void,
  acceptFollow: (userId: number) => void,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  getUsers: (currentPage: number, pageSize: number) => void,
  setCurrentPage: (currentPage: number) => void,
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

type OwnPropTypes = {
  pageTitle: string,
}


type PropTypes = MapStatePropTypes & MapDispatchPropTypes & OwnPropTypes;


class UsersContainer extends React.Component<PropTypes> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  }

  render() {
    const { pageTitle, isFetching, pageSize, totalUsersCount, currentPage, users, follow, unfollow, followingInProgress, acceptFollow, acceptUnFollow } = this.props;
    return <React.Fragment>
      <h2>{pageTitle}</h2>
      {isFetching ? <PreloaderImg /> : null}
      <Users totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={this.onPageChanged}
        users={users}
        follow={follow}
        unfollow={unfollow}
        followingInProgress={followingInProgress}
        acceptFollow={acceptFollow}
        acceptUnFollow={acceptUnFollow}
      />
    </React.Fragment>
  }
}

let mapStateToProps = (state: appStateType): MapStatePropTypes => {
  return {
    users: getAllUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

let mapDispatchToProps = (dispatch: Dispatch<any>):MapDispatchPropTypes  =>{
  return {  
    acceptUnFollow: (userId: number) => {
      dispatch(acceptUnFollow(userId))
    },
    acceptFollow: (userId: number) => {
      dispatch(acceptFollow(userId))
    },
    follow: (userId: number) => {
      dispatch(actions.follow(userId))
    },
    unfollow: (userId: number) => {
      dispatch(actions.unfollow(userId))
    },
    getUsers: (currentPage: number, pageSize: number) => {
      dispatch(getUsers(currentPage, pageSize))
    },
    setCurrentPage: (currentPage: number) => {
      dispatch( actions.setCurrentPage(currentPage))
    },
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
      dispatch(actions.toggleFollowingProgress(isFetching, userId))
    }
}
}

export default compose(
  connect<MapStatePropTypes, MapDispatchPropTypes, OwnPropTypes, appStateType>(mapStateToProps, mapDispatchToProps))(UsersContainer);
