import store from "./redux/redux-store"
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import './i18next';
import PreloaderImg from "./components/common/Preloader/PreloaderImg";


ReactDOM.render(
  <HashRouter /*basename={process.env.PUBLIC_URL} - это строка нужна для BrowserRouter для github pages*/>
    <Provider store={store}>
      <Suspense fallback={<PreloaderImg />}>
        <App />
      </Suspense>
    </Provider>
  </HashRouter>, document.getElementById('root'));

