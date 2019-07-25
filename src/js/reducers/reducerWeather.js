import { FETCH_WEATHER } from '../constants/constantTypes';

const initialState = {
    weatherInfo: {},
};

const reducer = (state = initialState, action) => {
    if (action.type === FETCH_WEATHER) {
        return {
            ...state,
            weatherInfo: action.data,
        };
    }
    return state;
};

export default reducer;
