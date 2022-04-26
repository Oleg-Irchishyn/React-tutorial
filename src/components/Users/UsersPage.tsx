import React from 'react';
import { useSelector } from 'react-redux';
import PreloaderImg from '../common/Preloader/PreloaderImg';
import { getIsFetching } from '../../redux/usersSelectors';
import { Users } from './Users';

type UsersPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = ({ pageTitle }) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <React.Fragment>
      <h2>{pageTitle}</h2>
      {isFetching ? <PreloaderImg /> : null}
      <Users />
    </React.Fragment>
  );
};
