import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
});

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>;

type PropertiesType<Type> = Type extends {[key: string]: infer AC} ? AC : never;

export type InferActionsTypes<Type extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<Type>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;
export default store;