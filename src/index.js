import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './reduxStore/store';

import { saveState } from "./reduxStore/browserStorage";
import { GoogleOAuthProvider } from '@react-oauth/google';

store.subscribe(() => {
  saveState(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="385627185644-14sv7efruhft29hmd5jooboci629m5u4.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
