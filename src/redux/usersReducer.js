const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

let initialState = {
    users: [
        { id: 1, followed: false, fullName: 'Dmitry', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 2, followed: true, fullName: 'Sasha', status: 'I am a boss too', location: { city: 'Moscow', country: 'Russia' } },
        { id: 3, followed: false, fullName: 'Andrew', status: 'I am a boss too', location: { city: 'Kyiv', country: 'Ukraine' } }
    ]
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const followAC = () => ({ type: FOLLOW });
export const unfollowAC = () => ({ type: UNFOLLOW });

export default usersReducer;