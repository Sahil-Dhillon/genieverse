import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import IconFa5 from '@expo/vector-icons/FontAwesome5';
import Icon from '@expo/vector-icons/MaterialIcons'
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Login from '../../pages/login';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const service = () => {
    return (
        <Login></Login>
    )
}


export default ServiceCard = ({ _id, title, imgLink, details, options, navigation }) => {
    const [expanded, setExpanded] = useState(false)
    const [data, setData] = useState(options.slice(0, 3))
    // const deg = useRef(new Animated.Value(0)).current;
    let deg = 0
    // const [icon, setIcon] = useState('expand-more')
    const expandCard = () => {
        setExpanded(!expanded)
        // Animated.timing(deg, {
        //     toValue: 180,
        //     duration: 500
        // }).start()
    }
    useEffect(() => {
        expanded ? setData(options) : setData(options.slice(0, 3))
    }, [expanded])
    const onService = (sid, title) => {
        navigation.navigate('Service', {
            s_id: sid,
            s_title: title
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.titleText}>{title}</Text>
                <IconFa5 name='arrow-right' color='#0094c6' size={16} />
            </View>
            <View style={styles.middleGrid}>
                {
                    data.map((data, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.serviceContainer} onPress={() => { onService(_id + "+" + data._id, data.item) }}>
                                <View style={styles.service}></View>
                                <Text>{data.item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {
                options.length > 3 && !expanded ? <Icon name='expand-more' size={30} onPress={expandCard} /> : options.length > 3 &&
                    expanded && <Icon name='expand-less' onPress={expandCard} size={30} />
                // options.length > 3 && <Icon name='expand-less' onPress={expandCard} size={30} style={{
                //     // transform: [{ rotate: `${deg}deg` }]
                // }} />
            }
            <View style={styles.bottomBar}>
                {details.map((data, index) => {
                    return (
                        <Text key={index} style={styles.pills}>
                            {data}
                        </Text>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        margin: 10,
        borderWidth: 1,
        // borderColor: '#0094c6ff',
        borderColor: '#ddd',
        // flex: 1,
        // padding: 10,
        // paddingHorizontal: 15,
        borderRadius: 20,
        // minHeight: '30%',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 20,
        // margin: 1

    },
    topBar: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
        padding: 10,
        // borderBottomWidth: 1

    },
    bottomBar: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    pills: {
        margin: 8,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    middleGrid: {
        margin: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'center',
        justifyContent: 'center'
    },
    serviceContainer: {
        justifyContent: 'center',
        // borderWidth: 1,
        margin: 10,
        alignItems: 'center'
    },
    service: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc'
    }
})