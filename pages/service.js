import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LoadingScreen from '../components/loading';

const Service = ({ route, navigation }) => {

    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList
    var S_id = route.params.s_id.split('+')
    const cardPress = (sid, title) => {
        navigation.navigate('TimeAndPlace', {
            s_id: sid,
            s_title: title
        })
    }
    return (
        <View style={styles.bgContainer}>
            {
                loading ? <LoadingScreen /> : error ? alert(error) :
                    services && services.find((item) => item._id == S_id[0]).options.find((item) => item._id == S_id[1]).services.map((data) => {
                        return (
                            <TouchableOpacity key={data._id} style={styles.card} activeOpacity={0.8} onPress={() => cardPress(route.params.s_id + '+' + data._id, route.params.s_title + "/" + data.name)}>
                                <Text style={styles.cardHeading}>
                                    {data.name}
                                </Text>
                                <Text style={styles.cardDesc}>
                                    {data.details}
                                </Text>
                                <Text style={styles.cardPrice}>
                                    {"Rs. " + data.price}
                                </Text>

                            </TouchableOpacity>
                        )
                    })

            }
        </View>
    )
}

export default Service

const styles = StyleSheet.create({
    bgContainer: {
        backgroundColor: '#000022',
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    card: {
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#eee',
        borderColor: '#fff',
        padding: 15,
        minHeight: 100,
        width: '100%'
    },
    cardHeading: {
        fontWeight: "500",
        fontSize: 20,
        paddingVertical: 10,
    },
    cardDesc: {
        fontWeight: "300",
        // fontSize: 20,
        // paddingVertical: 10,
    },
    cardPrice: {
        fontWeight: "bold",
        textAlign: "right",
        fontSize: 20
    }
})