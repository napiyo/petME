
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react'
import { Button, IconButton } from 'react-native-paper';

import CreatePost from './CreatePost';

import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import { useSelector } from 'react-redux'
import History from './History';


export default function Home({navigation}) {
    
    
    const Tab = createBottomTabNavigator();
    const userData = useSelector(state => state)
    useEffect(() => {
      if(!userData.uid){
          navigation.navigate("AuthScreens")
      }
   }, [userData.uid])
    return (
        <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeTab} options={{headerShown:false,tabBarIcon:()=><IconButton icon="home" size={25}/> }}/>
        <Tab.Screen name="CreatePost" component={CreatePost} options={{tabBarIcon:()=><IconButton icon="dog-side" size={25}/> }} />
        <Tab.Screen name="ProfileTab" component={ProfileTab} options={{title:"Profile",tabBarIcon:(focused)=><IconButton icon="account-circle" /> }}/>
        <Tab.Screen name="HistoryTab" component={History} options={{title:"History",tabBarIcon:(f,c,s)=><IconButton icon="history"/> }}/>
      </Tab.Navigator>
        
        
    )
}
