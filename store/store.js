import { useSelector } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetailsReducer, userSigninReducer, userSignupReducer } from './reducers/userReducers';
import { servicesDetailsReducer, servicesGroupCreateReducer, servicesListReducer } from './reducers/serviceReducers';


const initialState = {
    userSignin: {
        userInfo: AsyncStorage.getItem("userInfo") ? AsyncStorage.getItem("userInfo") : null
    }
};

const reducers = combineReducers({
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
    serviceList: servicesListReducer,
    serviceDetails: servicesDetailsReducer,
    servicesGroupCreate: servicesGroupCreateReducer,
})

const composeEnhancer = compose

const store = createStore(
    reducers,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
