import { acceptFollow, acceptUnFollow, actions } from './usersReducer';
import {followAPI, ResponseType, ResultCodesEnum} from '../api/api';
jest.mock('../api/api');
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;
const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success
} 

followAPIMock.toggleFollow.mockReturnValue(Promise.resolve(result))
followAPIMock.toggleUnFollow.mockReturnValue(Promise.resolve(result))

const dispatchMock = jest.fn();
const getStateMock = jest.fn();


beforeEach (() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    followAPIMock.toggleFollow.mockClear();
    followAPIMock.toggleUnFollow.mockClear();
})

test("successfully followed user" , async ()=> {
    const thunk = acceptFollow(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
   
} )

test("successfully unfollowed user" , async ()=> {
    const thunk = acceptUnFollow(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
   
} )