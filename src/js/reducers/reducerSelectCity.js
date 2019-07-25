import { SELECT_CITY } from '../constants/constantTypes';

const initialState = {
    selectedCity: 0,
};

const reducer = (state = initialState, action) => {
    if (action.type === SELECT_CITY) {
        return {
            ...state,
            selectedCity: action.cityId,
        };
    }
    return state;
};

export default reducer;
