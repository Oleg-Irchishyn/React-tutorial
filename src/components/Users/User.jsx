import React from 'react';
import styles from './users.module.css';
import userPhoto from "../../assets/images/user.jpg"
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, acceptUnFollow, unfollow, acceptFollow, follow }) => {
  return (
    <div className={styles.usersList__item}>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img alt="profile" src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.usersPhoto} />
          </NavLink>
        </div>
        <div>
          {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              acceptUnFollow(user.id)
              unfollow(user.id)
            }} >Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              acceptFollow(user.id)
              follow(user.id)
            }}>Follow</button>}
        </div>
      </span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
      <span>
        <div>{"u.location.country"}</div>
        <div>{"u.location.city"}</div>
      </span>
    </div>)

}

export default User;