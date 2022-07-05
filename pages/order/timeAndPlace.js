import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import React, { useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import LoadingScreen from '../../components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../store/actions/orderActions'
import { ORDER_CREATE_RESET, ORDER_DETAILS_RESET } from '../../store/constants/orderConstants';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TimeAndPlace({ route, navigation }) {
    useEffect(() => {
        dispatch({ type: ORDER_CREATE_RESET })
    }, [])

    const dispatch = useDispatch();
    const now = new Date()
    const [date, setDate] = useState(now);
    const [entryTime, setEntryTime] = useState(now);
    const [showDatePick, setShowDatePick] = useState(false);
    const [showEntryTime, setShowEntryTime] = useState(false)
    const [orderId, setOrderId] = useState()
    const tax = 50

    var timeSlot = entryTime.getHours() + ":" + entryTime.getMinutes()
    useEffect(() => {
        timeSlot = entryTime.getHours() + ":" + entryTime.getMinutes()
    }, [entryTime])
    const S_id = route.params.s_id.split("+")
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin

    const orderCreate = useSelector((state) => state.orderCreate)
    // const orderDetails = useSelector((state) => state.orderDetails)
    const { loading: orderCreateLoading, success: orderCreateSuccess, error: orderCreateError, order: orderPlaced } = orderCreate;

    // orderDetails.order && dispatch({ type: ORDER_DETAILS_RESET })
    const category = services && services.find(x => x._id == S_id[0])
    const subCategory = category && category.options.find(x => x._id == S_id[1])
    const service = subCategory && subCategory.services.find(x => x._id == S_id[2])

    const [addressSelected, setAddressSelected] = useState(userInfo && userInfo.savedAddress && userInfo.savedAddress[0]._id)
    const [addressStyle, setAddressStyle] = useState({ borderColor: '#ffaa11', backgroundColor: '#222' })
    const selectAddress = (id) => {
        setAddressSelected(id)
    }
    const onContinue = () => {
        const order = {
            name: service.name,
            group: category.title,
            subgroup: subCategory.item,
            timeSlot: timeSlot,
            price: service.price,
            serviceId: service._id
        }
        const address = userInfo && userInfo.savedAddress && userInfo.savedAddress.find(x => x._id = addressSelected)
        try {

            dispatch(createOrder({ orderItems: [order], paymentMethod: "payTm", serviceAddress: address, servicesPrice: order.price, taxPrice: tax, totalPrice: order.price + tax }))

        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        if (orderCreateSuccess) {

            if (orderPlaced && orderPlaced._id) {
                console.log(orderPlaced._id)
                alert("Order placed")
                navigation.navigate('Payment', {
                    O_id: orderPlaced._id
                })
            }
        }
    }, [dispatch, orderCreateSuccess]);
    return (
        <>
            <View style={{ flex: 1 }}>
                {
                    (loading || orderCreateLoading) ? <LoadingScreen /> : (error) ? alert(error) :
                        <View style={styles.bgContainer}>
                            <Text style={styles.sHeading}>{route.params.s_title.split("/")[1]}</Text>

                            <View style={styles.heroCard}>
                                <Text style={styles.sDesc}>
                                    {service.details}
                                </Text>
                                <Text style={styles.sPrice}>
                                    {service.price + "/-"}
                                </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={{ color: "#fff", paddingVertical: 15 }}>
                                    Select Date and Time according to your ease
                                </Text>
                                <Text style={styles.sDate}>
                                    {date == new Date() ? "Today" : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
                                </Text>
                                <Button title={date == new Date() ? "Today" : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()} onPress={() => setShowDatePick(true)} />
                                {showDatePick && (
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        onChange={(e, d) => {
                                            setDate(d)
                                            setShowDatePick(false)
                                        }}
                                        minimumDate={now}
                                        maximumDate={new Date(new Date().setDate(now.getDate() + 2))}
                                    />
                                )}
                                <Text style={styles.sDate}>
                                    {timeSlot.split(" to ")[0]}
                                </Text>
                                <Button title={timeSlot.split(" to ")[0]} onPress={() => setShowEntryTime(true)} />
                                {showEntryTime && (
                                    <DateTimePicker
                                        value={entryTime}
                                        mode={'time'}
                                        is24Hour={true}
                                        onChange={(e, t) => {
                                            setEntryTime(t)
                                            setShowEntryTime(false)
                                        }}
                                        maximum
                                    />
                                )}

                            </View>
                            {
                                userInfo && userInfo.savedAddress &&
                                <>
                                    <Text style={{ color: "#ddd", fontSize: 20, fontWeight: '700', marginVertical: 8 }}>
                                        Select Address
                                    </Text>
                                    <FlatList style={{ flex: 1, borderWidth: 1, borderColor: '#fff', margin: 10 }}
                                        data={userInfo.savedAddress}
                                        horizontal={true}
                                        renderItem={({ item }) => <TouchableOpacity style={[styles.addressCard, addressSelected == item._id && addressStyle]} onPress={() => selectAddress(item._id)}>
                                            <Text style={{ color: "#ddd" }}>
                                                {item.fullName}
                                            </Text>
                                            <Text style={{ color: "#ddd" }}>
                                                {item.phone}
                                            </Text>
                                            <Text style={{ color: "#ddd" }}>
                                                {item.address}
                                            </Text>
                                            <Text style={{ color: "#ddd" }}>
                                                {item.address2}
                                            </Text>
                                            <Text style={{ color: "#ddd" }}>
                                                {item.city} , {item.state}
                                            </Text>
                                        </TouchableOpacity>}
                                        keyExtractor={item => item._id}
                                    />
                                </>
                            }
                            {/* <ScrollView style={{ borderWidth: 1, borderColor: '#fff' }} >
                                {
                                    userInfo && userInfo.savedAddress &&
                                    userInfo.savedAddress.map(x => {
                                        return (

                                            <View style={styles.addressCard}>
                                                <Text style={{ color: "#ddd" }}>
                                                    {x.city}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView> */}
                        </View>

                }
            </View>

            <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.7} onPress={onContinue}>
                <Text style={{ color: '#fff', fontSize: 20 }}>Continue</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    bgContainer: {
        backgroundColor: '#000022',
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-between',
        // alignItems: 'stretch',
        borderColor: '#fff',
        borderWidth: 1
        // alignItems: 'center'
    },
    heroCard: {
        borderBottomColor: "#ddd",
        borderBottomWidth: 2,
        paddingBottom: 20
    },
    sHeading: {
        fontSize: 25,
        color: "#fff",
        paddingVertical: 15
    },
    sDesc: {
        fontWeight: "300",
        color: "#ddd",
    },
    sPrice: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25,
        padding: 10
    },
    sDate: {
        color: "#fff",
    },
    addressCard: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        margin: 10,
        width: 250,
        backgroundColor: '#555'
    },
    confirmBtn: {
        backgroundColor: '#ffaa11',
        padding: 15,
        alignItems: 'center'
    }
})
