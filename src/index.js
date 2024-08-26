import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Next UI
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
