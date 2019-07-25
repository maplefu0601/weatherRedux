import { FETCH_CITY } from '../constants/constantTypes';

const initialState = {
    cities: [],
};

const reducer = (state = initialState, action) => {
    if (action.type === FETCH_CITY) {
        return {
            ...state,
            cities: action.cities,
        };
    }
    return state;
};

export default reducer;
