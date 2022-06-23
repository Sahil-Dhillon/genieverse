import Axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_USER, REMOVE_SAVED_ADDRESS_FAIL, REMOVE_SAVED_ADDRESS_REQUEST, REMOVE_SAVED_ADDRESS_SUCCESS, USER_REFRESH, USER_SAVE_ADDRESS_FAIL, USER_SAVE_ADDRESS_REQUEST, USER_SAVE_ADDRESS_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"
// import { BACKEND_URL } from '@env'
// import Config from 'react-native-config'

const BACKEND_URL = 'https://geenieverse.herokuapp.com'
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
    try {
        console.log(email, password, BACKEND_URL)
        const { data } = await Axios.post(`${BACKEND_URL}/api/users/signin`, { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        AsyncStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } })
    try {
        const { data } = await Axios.post(`${BACKEND_URL}/api/users/signup`, { name, email, password })
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        AsyncStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const signout = () => (dispatch) => {
    AsyncStorage.removeItem("userInfo")
    AsyncStorage.removeItem("cartItems")
    AsyncStorage.removeItem('serviceAddress');
    dispatch({ type: USER_SIGNOUT })
}

export const getUser = () => async (dispatch, getState) => {
    const {
        userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`${BACKEND_URL}/api/users/currentUser`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    });
    dispatch({ type: GET_USER, payload: data })
}