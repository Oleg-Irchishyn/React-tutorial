import profileReducer, { AddPostActionCreator, deletePost } from "./profileReducer";
import React from 'react';
import ReactDOM from 'react-dom';

let state = {
  posts: [
    { id: 1, message: 'Hi, How are you?', likesCount: 0 },
    { id: 2, message: 'It is my new post', likesCount: 23 },
    { id: 3, message: 'Blabla', likesCount: 8 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ]
};

it('length of posts should be incremented', () => {
  // 1. test data
  let action = AddPostActionCreator("it-kamasutra.com");

  // 2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
  // 1. test data
  let action = AddPostActionCreator("it-kamasutra.com");

  // 2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts[4].message).toBe("it-kamasutra.com");
});

it('length of posts should be decremented after deleting', () => {
  // 1. test data
  let action = deletePost(1);

  // 2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(3);
});

it('length of posts should not be decremented after deleting an incorrect id', () => {
  // 1. test data
  let action = deletePost(1000);

  // 2. action
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.posts.length).toBe(4);
});