const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 0 },
        { id: 2, message: 'It is my new post', likesCount: 23 },
        { id: 3, message: 'Blabla', likesCount: 8 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ],
    newPostText: "it-kamasutra.com"
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = "";
            return state;

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const AddPostActionCreator = () => ({ type: ADD_POST });
export const updatedNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;