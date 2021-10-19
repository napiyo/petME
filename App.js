import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './Redux/store'
import Home from './Screens/Home';
import AuthScreens from './Screens/AuthScreens/AuthScreen';





export default function App() {  
  const StackMain= createNativeStackNavigator();
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StackMain.Navigator>
        <StackMain.Screen name="AuthScreens"  component={AuthScreens} options={{headerShown:false}}/>
        <StackMain.Screen name="HomeScreen"  component={Home} options={{headerShown:false}}/>
     
      </StackMain.Navigator>
    </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
