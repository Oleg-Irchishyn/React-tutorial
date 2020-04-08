import React from 'react';
import s from './ProfileInfo.module.css';
import PreloaderImg from '../../common/Preloader/PreloaderImg';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <PreloaderImg />
  }
  return (
    <div>
      {/*<div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      </div>*/}
      <div className={s.descriptionBlock}>
        <img alt="infoPhoto" src={props.profile.photos.large} />
        <ProfileStatus status={"Hello My friends"} />
      </div>
    </div>
  )
}

export default ProfileInfo;
