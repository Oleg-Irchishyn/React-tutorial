import React, { ChangeEvent, useState } from 'react';
import s from './ProfileInfo.module.css';
import PreloaderImg from '../../common/Preloader/PreloaderImg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileDataReduxForm from './ProfileDataReduxForm';
import { contactsType, profileType } from '../../../types/types';

type PropsType = {
  profile: profileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (formData: profileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  saveProfile,
  ...props
}) => {
  let [editMode, setEditMode] = useState(false);

  const onSubmit = (formData: profileType) => {
    const promise = saveProfile(formData);
    promise.then(() => setEditMode(false));
  };

  if (!profile) {
    return <PreloaderImg />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img alt="infoPhoto" src={profile.photos.large || userPhoto} className={s.avatar} />
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

type ContactsPropsType = {
  contactsTitle: string;
  contactsValue: string;
};

const Contacts: React.FC<ContactsPropsType> = ({ contactsTitle, contactsValue }) => {
  return (
    <div className={s.contacts}>
      <b>{contactsTitle}</b>:<b>{contactsValue}</b>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: profileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name: </b>
        {profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b>
        {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills:</b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me:</b>
        {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactsTitle={key}
              contactsValue={profile.contacts[key as keyof contactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileInfo;
