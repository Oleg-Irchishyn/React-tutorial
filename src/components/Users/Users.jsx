import React from 'react';
import *as axios from 'axios';
import styles from './users.module.css';
import userPhoto from "../../assets/images/user.jpg"
import { NavLink } from 'react-router-dom'

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      <div className={styles.paginationWrapper}>
        {pages.map(p => {
          return (
            <span className={props.currentPage === p && styles.selectedPage}
              onClick={(e) => { props.onPageChanged(p) }}>{p}
            </span>
          )
        })}
      </div>
      <div className={styles.usersList}>
        {props.users.map(u => <div className={styles.usersList__item} key={u.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + u.id}>
                <img alt="profile" src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto} />
              </NavLink>
            </div>
            <div>
              {u.followed
                ? <button onClick={() => {
                  axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                    {
                      withCredentials: true,
                      headers: {
                        "API-KEY": "debbd9e5-51f4-44e1-b1d8-ad026688cc54"
                      }

                    })
                    .then(response => {
                      if (response.data.resultCode === 0) {
                        props.unfollow(u.id)
                      }
                    });
                  props.unfollow(u.id)
                }} >Unfollow</button>
                : <button onClick={() => {
                  axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                    withCredentials: true,
                    headers: {
                      "API-KEY": "debbd9e5-51f4-44e1-b1d8-ad026688cc54"
                    }
                  })
                    .then(response => {
                      if (response.data.resultCode === 0) {
                        props.follow(u.id)
                      }
                    });
                  props.follow(u.id)
                }}>Follow</button>}
            </div>
          </span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{"u.location.country"}</div>
            <div>{"u.location.city"}</div>
          </span>
        </div>)
        }
      </div>
    </div>
  )
}

export default Users;