import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring';
import { actions, filterType } from '../../redux/usersReducer';
import Paginator from '../common/Preloader/Paginator/Paginator';
import { getUsers } from './../../redux/usersReducer';
import {
  getAllUsers,
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
} from './../../redux/usersSelectors';
import User from './User';
import styles from './users.module.css';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';

type PropTypes = {
  portionSize?: number;
};

export const Users: React.FC<PropTypes> = () => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getAllUsers);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
  };

  React.useEffect(() => {
    const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case 'null':
        actualFilter = {
          ...actualFilter,
          friend: null,
        };
        break;
      case 'true':
        actualFilter = {
          ...actualFilter,
          friend: true,
        };
        break;
      case 'false':
        actualFilter = {
          ...actualFilter,
          friend: false,
        };
        break;
    }

    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, []);

  React.useEffect(() => {
    const query: QueryParamsType = {};
    if (filter.term) {
      query.term = filter.term;
    }
    if (filter.friend !== null) {
      query.friend = String(filter.friend);
    }
    if (currentPage !== 1) {
      query.page = String(currentPage);
    }
    history.push({
      pathname: '',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: filterType) => {
    dispatch(getUsers(1, pageSize, filter));
  };

  const follow = (userId: number) => {
    dispatch(actions.follow(userId));
  };

  const unfollow = (userId: number) => {
    dispatch(actions.unfollow(userId));
  };

  const acceptFollow = (userId: number) => {
    dispatch(acceptFollow(userId));
  };

  const acceptUnFollow = (userId: number) => {
    dispatch(acceptUnFollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div className={styles.usersList}>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            acceptUnFollow={acceptUnFollow}
            unfollow={unfollow}
            acceptFollow={acceptFollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};
