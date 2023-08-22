import {USER_LOGOUT} from "./actions";


export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {};
        case "LOG_IN":
            return {...state, user: action.payload};
        default:
            return state;
    }
};
