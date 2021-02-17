import { AddPostActionCreator, actions } from '../../../redux/profileReducer';
import MyPosts, { MapStatePropsType, MapDispatchPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { appStateType } from '../../../redux/redux-store';

const mapStateToProps = (state: appStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, appStateType>(
  mapStateToProps,
  {
    addPost: actions.AddPostActionCreator,
  },
)(MyPosts);

export default MyPostsContainer;
