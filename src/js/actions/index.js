import {
    FETCH_CITY,
    FETCH_WEATHER,
    FETCH_WEATHER_DETAIL,
    SELECT_CITY,
    SHOW_WEATHER_DETAIL,
    HIDE_WEATHER_DETAIL,
} from '../constants/constantTypes';

const apiKey = 'a30f79a44d74a7b2c4c8f414d958a23e';
const apiWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;
const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}`;
const cityData = 'cities.json';

export const getCities = () => {
    return dispatch => {
        fetch(cityData)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: FETCH_CITY, cities: data });
                return {
                    cities: data,
                };
            });
    };
};

export const selectCity = cityId => {
    return dispatch => {
        dispatch({ type: SELECT_CITY, cityId });
    };
};

export const getWeather = cityId => {
    return dispatch =>
        fetch(`${apiWeatherUrl}&id=${cityId}`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: FETCH_WEATHER,
                    data,
                });
                return { data };
            });
};

export const getWeatherDetail = cityId => {
    console.log('getWeatherDetail:----');
    return dispatch =>
        fetch(`${apiUrl}&id=${cityId}`)
            .then(response => response.json())
            .then(data => {
                console.log('weather detail:', cityId, data);
                dispatch({
                    type: FETCH_WEATHER_DETAIL,
                    data,
                });
                dispatch({
                    type: SHOW_WEATHER_DETAIL,
                    show: true,
                });
                return { data };
            });
};

export const hideWeatherDetail = () => {
    return dispatch => {
        dispatch({ type: HIDE_WEATHER_DETAIL, show: false });
    };
};

export const showPages = event => {
    return dispatch => {
        console.log('show pages:', event);
        // dispatch();
    };
};
