import React, { Component } from 'react';
import { AddPostActionCreator, updatedNewPostTextActionCreator } from "../../../redux/profileReducer";
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';

const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer> 
            {
            (store) => {
                let state = store.getState();
                let addPost = () => {
                    store.dispatch(AddPostActionCreator());
                }

                let onPostChange = (text) => {
                    let action = updatedNewPostTextActionCreator(text);
                    store.dispatch(action);
                }
                return <MyPosts
                    updateNewPostText={onPostChange}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}

                />
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;
