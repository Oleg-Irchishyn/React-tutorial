const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, How are you?', likesCount: 0 },
                { id: 2, message: 'It is my new post', likesCount: 23 },
                { id: 3, message: 'Blabla', likesCount: 8 },
                { id: 4, message: 'Dada', likesCount: 11 }
            ],
            newPostText: "it-kamasutra.com"
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Viktor' },
                { id: 5, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How is yout it-kamasutra?' },
                { id: 3, message: 'Yo' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Yo' }
            ]
        }
    },
    _callSubscriber() {
        console.log('state is changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; // паттерн observer почитать о нем
    },
    dispatch(action) { 
        if (action.type === ADD_POST) { // { type: 'ADD-POST' }
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) { // { type: 'UPDATE-NEW-POST-TEXT' }
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

export const AddPostActionCreator = () => {
    return {
        type: ADD_POST 
    }
}

export const updatedNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export default store;
window.store = store;
// store - OOP