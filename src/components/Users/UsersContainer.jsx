import React from 'react';
import { connect } from 'react-redux';
import {
  follow, unfollow, setCurrentPage,
  toggleFollowingProgress, getUsers,
  acceptFollow, acceptUnFollow
} from '../../redux/usersReducer';
import Users from "./Users";
import PreloaderImg from '../common/Preloader/PreloaderImg';
import {
  getAllUsersSelector, getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching, getFollowingInProgress
} from '../../redux/usersSelectors';
import { compose } from 'redux'

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  }

  render() {
    return <React.Fragment>
      {this.props.isFetching ? <PreloaderImg /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
        acceptFollow={this.props.acceptFollow}
        acceptUnFollow={this.props.acceptUnFollow}
      />
    </React.Fragment>
  }
}

let mapStateToProps = (state) => {
  return {
    users: getAllUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  connect(mapStateToProps, {
    follow, unfollow, setCurrentPage,
    toggleFollowingProgress, getUsers,
    acceptFollow, acceptUnFollow
  }))(UsersContainer);
