import { GET_USER, REMOVE_SAVED_ADDRESS_FAIL, REMOVE_SAVED_ADDRESS_REQUEST, REMOVE_SAVED_ADDRESS_SUCCESS, USER_SAVE_ADDRESS_FAIL, USER_SAVE_ADDRESS_REQUEST, USER_SAVE_ADDRESS_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNOUT:
            return {}

        default:
            return state;
    }
}


export const userSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNOUT:
            return {}
        default:
            return state;
    }
}


export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        // case USER_SAVE_ADDRESS_REQUEST:
        //     return { ...state, loading: true };
        // case USER_SAVE_ADDRESS_SUCCESS:
        //     return { loading: false, currentUser: action.payload, success: true };
        // case USER_SAVE_ADDRESS_FAIL:
        //     return { ...state, loading: false, error: action.payload, success: false };
        // case REMOVE_SAVED_ADDRESS_REQUEST:
        //     return { ...state, loading: true, success: false, idToBeDeleted: action.payload }
        // case REMOVE_SAVED_ADDRESS_SUCCESS:
        //     return { loading: false, currentUser: action.payload, success: true }
        // case REMOVE_SAVED_ADDRESS_FAIL:
        //     return { ...state, loading: false, success: false, error: action.payload }
        // case ADD_CART_ITEM_REQUEST:
        //     return { ...state, loading: true, requestedData: action.payload, success: false };
        // case ADD_CART_ITEM_SUCCESS:
        //     return { loading: false, currentUser: action.payload, success: true };
        // case ADD_CART_ITEM_FAIL:
        //     return { ...state, loading: false, error: action.payload, success: false };
        // case REMOVE_CART_ITEM_REQUEST:
        //     return { ...state, loading: true, success: false, idToBeDeleted: action.payload }
        // case REMOVE_CART_ITEM_SUCCESS:
        //     return { loading: false, currentUser: action.payload, success: true }
        // case REMOVE_CART_ITEM_FAIL:
        //     return { ...state, loading: false, success: false, error: action.payload }
        // case EMPTY_CART_REQUEST:
        //     return { ...state, loading: true, success: false }
        // case EMPTY_CART_SUCCESS:
        //     return { loading: false, currentUser: action.payload, success: true }
        // case EMPTY_CART_FAIL:
        //     return { ...state, loading: false, success: false, error: action.payload }
        case GET_USER:
            return { loading: false, currentUser: action.payload }
        default:
            return state;
    }
}