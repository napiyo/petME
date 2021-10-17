
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'

import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';

export default function Home() {
    
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="ProfileTab" component={ProfileTab} />
      </Tab.Navigator>
        
        
    )
}
