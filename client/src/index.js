import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./components/reducers/index";
import 'antd/dist/antd.css';

// Route
import { BrowserRouter } from "react-router-dom";
// antd
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
