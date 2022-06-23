import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group';
import React, { useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import LoadingScreen from '../../components/loading';
import { useSelector } from 'react-redux';

export default function TimeAndPlace({ route }) {
    const now = new Date()
    const [date, setDate] = useState(now);
    const [entryTime, setEntryTime] = useState(now);
    const [exitTime, setExitTime] = useState(new Date(new Date().setHours(now.getHours() + 1)));
    const [showDatePick, setShowDatePick] = useState(false);
    const [showEntryTime, setShowEntryTime] = useState(false)
    const [showExitTime, setShowExitTime] = useState(false)
    var timeSlot = entryTime.getHours() + ":" + entryTime.getMinutes() + " to " + exitTime.getHours() + ":" + entryTime.getMinutes()
    useEffect(() => {
        timeSlot = entryTime.getHours() + ":" + entryTime.getMinutes() + " to " + exitTime.getHours() + ":" + entryTime.getMinutes()
    }, [entryTime, exitTime])
    const S_id = route.params.s_id.split("+")
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin
    const service = services && services.find(x => x._id == S_id[0]).options.find(x => x._id == S_id[1]).services.find(x => x._id == S_id[2])
    return (
        <View style={styles.bgContainer}>
            <Text style={styles.sHeading}>{route.params.s_title.split("/")[1]}</Text>
            {
                loading ? <LoadingScreen /> : error ? alert(error) :
                    <View>

                        <View style={styles.heroCard}>
                            <Text style={styles.sDesc}>
                                {service.details}
                            </Text>
                            <Text style={styles.sPrice}>
                                {service.price + "/-"}
                            </Text>
                        </View>
                        <View>
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
                            <Text style={styles.sDate}>
                                {timeSlot.split(" to ")[1]}
                            </Text>
                            <Button title={timeSlot.split(" to ")[1]} onPress={() => setShowEntryTime(true)} />
                            {showEntryTime && (
                                <DateTimePicker
                                    value={exitTime}
                                    mode={'time'}
                                    is24Hour={true}
                                    onChange={(e, t) => {
                                        setExitTime(t)
                                        setShowExitTime(false)
                                    }}
                                // maximumDate={new Date()}
                                />
                            )}
                        </View>
                        <ScrollView>
                            {
                                userInfo && userInfo.savedAddress && userInfo.savedAddress.map(x => {
                                    <View style={styles.addressCard}>
                                        <Text style={{ color: "#ddd" }}>
                                            {x.city}
                                        </Text>
                                    </View>
                                })
                            }
                        </ScrollView>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    bgContainer: {
        backgroundColor: '#000022',
        flex: 1,
        padding: 15,
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
        margin: 10
    }
})
