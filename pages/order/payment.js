import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOrderDetails, initiateTransaction } from '../../store/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/loading';
import AllInOneSDKManager from 'paytm_allinone_react-native'
import axios from 'axios';
import { BACKEND_URL } from '@env'
const Payment = ({ route }) => {
    console.log(BACKEND_URL)
    const [txnToken, setTxnToken] = useState()
    const [mid, setMid] = useState()
    const orderId = route.params.O_id
    const callbackUrl = "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=" + orderId
    console.log(callbackUrl)
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userSignin);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order } = orderDetails;
    const initiateTransactionState = useSelector((state) => state.initiateTransaction)
    const { initiationResponse, error: initiateTransactionError } = initiateTransactionState;
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = useSelector((state) => state.orderPayment);

    // InitiateTransaction to get transaction token
    useEffect(() => {
        console.log(route.params.O_id)
        dispatch(initiateTransaction(route.params.O_id));
        // Get Mid
        axios.get(`https://geenieverse.herokuapp.com/api/orders/config/paytm`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }).then((x) => setMid(x.data))
    }, [order])




    // Get Order Details
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, successPay]);


    // set txnToken
    useEffect(() => {
        if (initiationResponse && initiationResponse.body) {
            console.log(initiationResponse.body.resultInfo.resultStatus)
            if (initiationResponse.body.resultInfo.resultStatus == "S") {
                setTxnToken(initiationResponse.body.txnToken)
                console.log(initiationResponse)
            }
        }
    }, [dispatch, initiationResponse]);

    useEffect(() => {
        // console.log(orderId, mid, txnToken, order.totalPrice, callbackUrl)
        if (orderId && mid && txnToken && order && callbackUrl) {
            console.log(orderId.toString(), mid.toString(), txnToken.toString(), order.totalPrice.toString(), callbackUrl, true, false)
        }
    }, [txnToken, order, mid])

    return (
        <View>
            <Text>{orderId}</Text>
            {
                txnToken ? <Text>{txnToken}</Text> : <LoadingScreen />
            }
            {
                mid ? <Text>{mid}</Text> : <LoadingScreen />
            }
            {
                txnToken && mid && order && <Button title='pay' onPress={() => {
                    console.log(orderId.toString(), mid.toString(), txnToken.toString(), order.totalPrice.toString(), callbackUrl, true, false)
                    // console.log(AllInOneSDKManager.startTransaction())
                    AllInOneSDKManager.startTransaction("PAYTM_ORDER_313192", "KycJuO51648482934748", "b19be10ba1c14944a1402466374b35b41656936759959", "1", "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=PAYTM_ORDER_313192", true, false)
                }
                } />
            }
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({})