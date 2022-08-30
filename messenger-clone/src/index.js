import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'moment/locale/vi';
import moment from 'moment';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store, { sagaMiddleware } from './redux/store';
import rootSaga from './redux/sagas';
import AppSnackBar from './components/AppSnackBar';
import { appSnackBarRef } from './constants';

moment.updateLocale('en', {
  relativeTime: {
    past: "%s",
  }
});

moment.updateLocale('vi', {
  relativeTime: {
    past: "%s",
  }
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <AppSnackBar ref={appSnackBarRef} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
