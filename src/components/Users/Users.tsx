import React from 'react';
import styles from './users.module.css';
import Paginator from '../common/Preloader/Paginator/Paginator';
import User from './User'
import { usersType } from '../../types/types';

type PropTypes = {
  totalUsersCount: number,
  pageSize: number,
  onPageChanged: (pageNumber: number) => void,
  currentPage: number,
  portionSize?: number,
  users: Array<usersType>,
  followingInProgress: Array<number>,
  acceptUnFollow: (userId: number) => void,
  acceptFollow: (userId: number) => void,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,

}

let Users: React.FC<PropTypes> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
      <div className={styles.usersList}>
        {users.map(u => <User user={u} key={u.id}
          followingInProgress={props.followingInProgress} acceptUnFollow={props.acceptUnFollow}
          unfollow={props.unfollow} acceptFollow={props.acceptFollow} follow={props.follow}
        />)}
      </div>
    </div>
  )
}

export default Users;