import React from 'react';
import s from './ProfileInfo.module.css';
import { reduxForm } from 'redux-form';
import { Input, Textarea, createField } from '../../common/Preloader/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../../redux/utils/validators/validators';
import styles from "../../../components/common/Preloader/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <b>Full name: </b>
        {createField("Full Name", "fullName", Input, [required])}
      </div>
      <div>
        <b>Looking for a job:</b>
        {createField("", "lookingForAJob", Input, [], { type: "checkbox" })}
      </div>
      <div>
        <b>My professional skills:</b>
        {createField("My professional skills", "lookingForAJobDescription", Textarea, [required])}
      </div>
      <div>
        <b>About me:</b>
        {createField("About me", "AboutMe", Textarea, [])}
      </div>
      <div>
        <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
          return <div classname={s.contacts} key={key}>
            <b>{key}:{createField(key, "contacts." + key, Input, [])}</b>
          </div>
        })
        }
      </div>
      {error && <div className={styles.formSummaryError}>
        {error}
      </div>
      }
      <div>
        <button>Save</button>
      </div>
    </form>
  )
}

const ProfileDataReduxForm = reduxForm({
  form: "edit-profile"
})(ProfileDataForm);

export default ProfileDataReduxForm;