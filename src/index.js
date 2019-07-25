import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/components/App';
import * as serviceWorker from './serviceWorker';

import reducerSelectCity from './js/reducers/reducerSelectCity';
import reducerCity from './js/reducers/reducerCity';
import reducerWeather from './js/reducers/reducerWeather';
import reducerWeatherDetail from './js/reducers/reducerWeatherDetail';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    reducerSelectCity,
    reducerCity,
    reducerWeather,
    reducerWeatherDetail,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
