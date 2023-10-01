//import React from 'react';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
//import rootReducer from '../src/V3/Reducers';
import rootReducer from '../src/Reducers';
import thunk from 'redux-thunk';
import axios from 'axios';
import Config from '../src/Utility/Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../src/Utility/Public/css/toastify.css';
import '../src/Utility/Public/css/Left.scss';
import '../src/Utility/Public/css/theme.css';

import '../src/Utility/Public/css/headerdoc.scss';
import '../src/Utility/Public/css/headerresponsivedoc.scss';
import "./i18n";

const axiosInstance = axios.create({
    baseURL: Config.baseURL
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
    persistedReducer,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);
export default store;

const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <Suspense fallback={false}>
                <App />
            </Suspense>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
