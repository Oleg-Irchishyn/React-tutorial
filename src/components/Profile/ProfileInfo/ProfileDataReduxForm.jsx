import React from 'react';
import { reduxForm } from 'redux-form'
import { Input, Textarea, createField } from '../../common/Preloader/FormsControls/FormsControls';
import { required, maxLengthCreator, } from '../../../redux/utils/validators/validators';

const ProfileDataForm = ({ handleSubmit }) => {
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
        {createField("About me", "AboutMe", Textarea, [required])}
      </div>
      {/*<div>
        <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
          return <Contacts key={key} contactsTitle={key} contactsValue={profile.contacts[key]} />
        })
        }
      </div>*/}
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