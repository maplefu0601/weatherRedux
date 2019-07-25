import { FETCH_WEATHER_DETAIL, SHOW_WEATHER_DETAIL, HIDE_WEATHER_DETAIL } from '../constants/constantTypes';

const initialState = {
    weatherInfoDetail: null,
    show: false,
};

const reducer = (state = initialState, action) => {
    if (action.type === FETCH_WEATHER_DETAIL) {
        return {
            ...state,
            weatherInfoDetail: action.data,
        };
    }
    if (action.type === SHOW_WEATHER_DETAIL) {
        return {
            ...state,
            show: true,
        };
    }
    if (action.type === HIDE_WEATHER_DETAIL) {
        return {
            ...state,
            show: false,
        };
    }
    return state;
};

export default reducer;
