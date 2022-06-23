// import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, StatusBar } from 'react-native'
import Login from './pages/login'
import { Provider } from 'react-redux'
import store from './store/store'
import AppStack from './AppStack'
let camera
const BAR_HEIGHT = StatusBar.currentHeight;
const THEME_COLOR = '#000022'
const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={[styles.statusbar, backgroundColor]}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default App = () => {
  return (
    <Provider store={store}>
      <AppStatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
      <AppStack></AppStack>
      {/* <Login></Login> */}
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusbar: {
    // height: BAR_HEIGHT,
    backgroundColor: THEME_COLOR,
    color: '#fff'
  }
})
