import { acceptFollow } from './usersReducer';
import {followAPI, ResponseType, ResultCodesEnum} from '../api/api';
jest.mock('../api/api');
const followAPIMock = followAPI;
const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success
} 

//@ts-ignore 
followAPIMock.toggleFollow.mockReturnValue(result)

test("" , async ()=> {
    const thunk = acceptFollow(1);
    const dispatchMock = jest.fn();
    //@ts-ignore
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(3);
} )