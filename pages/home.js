// import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, FlatList } from 'react-native'
import { Button } from 'react-native'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ServiceCard from '../components/home/serviceCard'
import LoadingScreen from '../components/loading'
import { listServices } from '../store/actions/servicesAction'
import { signout } from '../store/actions/userActions'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function HomeScreen({ navigation }) {
    // let userData = AsyncStorage.getItem('userInfo') ? AsyncStorage.getItem('userInfo').name : "Logged out"
    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin
    console.log(userInfo)
    const logout = () => {
        alert('Logged out')
        dispatch(signout())
    }
    // const dispatch = useDispatch()
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList
    useEffect(() => {
        dispatch(listServices())
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <View style={styles.bgContainer}>
                <View style={styles.headerText}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='account-circle' color='#ddd' size={38} />
                        <Text style={styles.headerText}>Hi, {userInfo && userInfo.name}</Text>
                    </View>
                    <Icon name='logout' onPress={logout} color='#ddd' size={25} />
                </View>
            </View>
            <View style={styles.scrollContainer}>
                {/* {
                    loading ? <LoadingScreen /> : error ? alert(error) :
                        <FlatList
                            data={services}
                            renderItem={({ item }) => <ServiceGroupCard {...item} />}
                            keyExtractor={item => item._id}
                        />
                    // <View></View>
                } */}

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} overScrollMode='never' contentContainerStyle={styles.wrapper}>
                    {loading ? <LoadingScreen /> : error ? alert(error) :
                        services.map((data, index) => {
                            return (

                                <ServiceCard key={index} {...data} navigation={navigation} />

                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000022',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    bgContainer: {
        minWidth: '100%',
        backgroundColor: '#000022',
        minHeight: '20%',
        padding: 20
    },
    headerText: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 20,
        textTransform: 'capitalize'
    },
    scrollContainer: {
        flex: 1,
        minWidth: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
        maxWidth: '100%',
        // borderWidth: 1
    },
    wrapper: {
        flex: 1,
        // borderWidth: 1,
        alignItems: 'center',
        margin: 10,
        maxWidth: '100%'
    },

});