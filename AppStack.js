import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoadingScreen from './components/loading'
import Login from './pages/login'
import HomeScreen from './pages/home'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainStack from './MainStack'
const Stack = createStackNavigator()
const AppStack = () => {
    // let userData = AsyncStorage.getItem('userInfo')
    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo, loading, error } = userSignin
    console.log(userInfo, loading, error)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {loading ? (<Stack.Screen name='Loading' options={{ headerShown: false }} component={LoadingScreen} />) :
                    userInfo && userInfo.email ? (<Stack.Screen name='Main' options={{ headerShown: false }} component={MainStack} />) : (
                        <Stack.Screen name='Login' options={{ headerShown: false }} component={Login} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack