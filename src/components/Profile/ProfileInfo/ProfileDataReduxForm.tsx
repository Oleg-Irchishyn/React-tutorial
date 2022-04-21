import React from 'react';
import s from './ProfileInfo.module.css';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input, Textarea, createField } from '../../common/Preloader/FormsControls/FormsControls';
import { required } from '../../../redux/utils/validators/validators';
import styles from '../../../components/common/Preloader/FormsControls/FormsControls.module.css';
import { profileType, contactsType, photosType } from '../../../types/types';

type ProfileDataFormOwnProps = {
  profile: profileType;
};

export type ProfileDataFormValuesType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: contactsType;
  photos: photosType;
  aboutMe: string;
};

type ProfileDataFormValuesTypeKeys = Extract<keyof ProfileDataFormValuesType, string>;

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileDataFormValuesType, ProfileDataFormOwnProps> & ProfileDataFormOwnProps
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <b>Full name: </b>
        {createField<ProfileDataFormValuesTypeKeys>('Full Name', 'fullName', Input, [required])}
      </div>
      <div>
        <b>Looking for a job:</b>
        {createField<ProfileDataFormValuesTypeKeys>('', 'lookingForAJob', Input, [], {
          type: 'checkbox',
        })}
      </div>
      <div>
        <b>My professional skills:</b>
        {createField<ProfileDataFormValuesTypeKeys>(
          'My professional skills',
          'lookingForAJobDescription',
          Textarea,
          [required],
        )}
      </div>
      <div>
        <b>About me:</b>
        {createField<ProfileDataFormValuesTypeKeys>('About me', 'aboutMe', Textarea, [])}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div className={s.contacts} key={key}>
              <b>
                {key}:{createField(key, 'contacts.' + key, Input, [])}
              </b>
            </div>
          );
        })}
      </div>
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm<ProfileDataFormValuesType, ProfileDataFormOwnProps>({
  form: 'edit-profile',
})(ProfileDataForm);

export default ProfileDataReduxForm;
