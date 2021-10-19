
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
        <Tab.Screen name="HomeTab" component={HomeTab} options={{headerShown:false,tabBarIcon:({focused,color})=><IconButton icon="home" size={25} color={color}/> }}/>
        <Tab.Screen name="CreatePost" component={CreatePost} options={{tabBarIcon:({color})=><IconButton icon="dog-side" size={25} color={color}/>,  }} />
        <Tab.Screen name="ProfileTab" component={ProfileTab} options={{title:"Profile",tabBarIcon:({color})=><IconButton icon="account-circle" color={color} /> }}/>
        <Tab.Screen name="HistoryTab" component={History} options={{headerShown:false,tabBarIcon:({color})=><IconButton icon="history" color={color}  /> }}/>
      </Tab.Navigator>
        
        
    )
}
