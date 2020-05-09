import React from 'react';
import styles from './users.module.css';
import Paginator from '../common/Preloader/Paginator/Paginator';
import User from './User'

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, ...props }) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
      <div className={styles.usersList}>
        {props.users.map(u => <User user={u} key={u.id}
          followingInProgress={props.followingInProgress} acceptUnFollow={props.acceptUnFollow}
          unfollow={props.unfollow} acceptFollow={props.acceptFollow} follow={props.follow}
        />)}
      </div>
    </div>
  )
}

export default Users;