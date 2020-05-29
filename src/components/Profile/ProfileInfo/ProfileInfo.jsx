import React from 'react';
import s from './ProfileInfo.module.css';
import PreloaderImg from '../../common/Preloader/PreloaderImg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/user.jpg"

const ProfileInfo = ({ profile, status, updateStatus, isOwner, ...props }) => {
  if (!profile) {
    return <PreloaderImg />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }
  return (
    <div>
      {/*<div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      </div>*/}
      <div className={s.descriptionBlock}>
        <img alt="infoPhoto" src={profile.photos.large || userPhoto} className={s.avatar} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

export default ProfileInfo;
