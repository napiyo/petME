import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react'
import HistoryOne from './HistoryOne';
import HistoryShow from './HistoryShow';
import Pasthistory from './Pasthistory';
import Requests from './Requests';

export default function History({navigation}) {
    const historyNav = createNativeStackNavigator();
        return(
      <historyNav.Navigator>
        <historyNav.Screen name="historyOne" component={HistoryOne} options={{title:"Your pets"}}/>
        <historyNav.Screen name="requests"  component={Requests} options={{title:"Requests"}}/>
        <historyNav.Screen name="historyShow" component={HistoryShow} />
        <historyNav.Screen name="Pasthistory" component={Pasthistory} options={{title:"Past Requests"}} />
        
        </historyNav.Navigator>
    )
}

