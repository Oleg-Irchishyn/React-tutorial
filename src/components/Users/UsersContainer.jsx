import React from 'react';
import { connect } from 'react-redux';
import {
  follow, unfollow, setCurrentPage,
  toggleFollowingProgress, getUsers,
  acceptFollow, acceptUnFollow
} from '../../redux/usersReducer';
import Users from "./Users";
import PreloaderImg from '../common/Preloader/PreloaderImg';


class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  }

  render() {
    return <>
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
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToProps, {
  follow, unfollow, setCurrentPage,
  toggleFollowingProgress, getUsers,
  acceptFollow, acceptUnFollow
})(UsersContainer);;
