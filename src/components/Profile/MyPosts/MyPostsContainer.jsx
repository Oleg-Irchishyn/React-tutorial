import React, { Component } from 'react';
import { AddPostActionCreator, updatedNewPostTextActionCreator } from "../../../redux/profileReducer";
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updatedNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: () => {
            dispatch(AddPostActionCreator());
        }

    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
