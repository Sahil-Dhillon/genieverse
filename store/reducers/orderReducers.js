import {
    INITIATE_TRANSACTION_FAIL,
    INITIATE_TRANSACTION_REQUEST,
    INITIATE_TRANSACTION_RESET,
    INITIATE_TRANSACTION_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_RESET,
    ORDER_DETAILS_SUCCESS,
    ORDER_HISTORY_FAIL,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true, order: {} };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true, orderId: action.payload };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const orderHistoryReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_HISTORY_REQUEST:
            return { loading: true };
        case ORDER_HISTORY_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_HISTORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const initiateTransactionReducer = (state = { loading: true, initiationResponse: {} }, action) => {
    switch (action.type) {
        case INITIATE_TRANSACTION_REQUEST:
            return { loading: true, orderId: action.payload };
        case INITIATE_TRANSACTION_SUCCESS:
            return { loading: false, initiationResponse: action.payload };
        case INITIATE_TRANSACTION_FAIL:
            return { loading: false, error: action.payload };
        case INITIATE_TRANSACTION_RESET:
            return {};
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true, order: action.payload.order, paymentResult: action.payload.paymentResult };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true, updatedOrder: action.payload };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};