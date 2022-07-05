import Axios from "axios";
import { SERVICES_CREATE_FAIL, SERVICES_CREATE_REQUEST, SERVICES_CREATE_SUCCESS, SERVICES_DETAILS_FAIL, SERVICES_DETAILS_REQUEST, SERVICES_DETAILS_SUCCESS, SERVICES_GROUP_CREATE_FAIL, SERVICES_GROUP_CREATE_REQUEST, SERVICES_GROUP_CREATE_SUCCESS, SERVICES_LIST_FAIL, SERVICES_LIST_REQUEST, SERVICES_LIST_SUCCESS } from "../constants/servicesConstants"
import { BACKEND_URL } from '@env';


// const BACKEND_URL = 'https://geenieverse.herokuapp.com'
export const listServices = () => async (dispatch) => {
    dispatch({
        type: SERVICES_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get(`${BACKEND_URL}/api/services`)
        dispatch({
            type: SERVICES_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SERVICES_LIST_FAIL,
            payload: error.message
        })
    }
}

export const detailsServices = (services_group_subgroup) => async (dispatch) => {
    dispatch({
        type: SERVICES_DETAILS_REQUEST,
        payload: services_group_subgroup
    })
    try {
        const { data } = await Axios.get(`${BACKEND_URL}/api/services/${services_group_subgroup}`);
        dispatch({ type: SERVICES_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SERVICES_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const createServiceGroup = () => async (dispatch, getState) => {
    dispatch({ type: SERVICES_GROUP_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(
            `${BACKEND_URL}/api/services/add/group`,
            {},
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({
            type: SERVICES_GROUP_CREATE_SUCCESS,
            payload: data.serviceGroup,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SERVICES_GROUP_CREATE_FAIL, payload: message });
    }
};
export const createService = (group, subgroup, name, price, details, availability,) => async (dispatch, getState) => {
    dispatch({ type: SERVICES_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(
            `${BACKEND_URL}/api/services/add/service/${group}/${subgroup}`,
            { name, price, details, availability },
            {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            }
        );
        dispatch({
            type: SERVICES_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SERVICES_CREATE_FAIL, payload: message });
    }
};