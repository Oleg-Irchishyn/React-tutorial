import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../redux/utils/validators/validators';
import { createField, Textarea } from '../../common/Preloader/FormsControls/FormsControls';
import { postsType } from '../../../types/types';

type OwnPropsType = {
  posts: Array<postsType>,
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<OwnPropsType> = React.memo((props) => {

  let postsElements = [...props.posts].reverse().map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />)

  let onAddPost = (values: AddNewPostFormValuesType) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
});

const maxLength10 = maxLengthCreator(10);

export type AddNewPostFormValuesType = {
  newPostText: string
}

type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewPostFormValuesType, string>

type PropsType = {}

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddNewPostFormValuesTypeKeys>("Post Message", "newPostText", Textarea, [required, maxLength10])}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormValuesType, PropsType>({
  form: "profileAddNewPostForm"
})(AddNewPostForm);


export default MyPosts;
