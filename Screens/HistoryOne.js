import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Button, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import  { db } from '../fierbaseConfiguration'
import HistoryShow from './HistoryShow';


export default function HistoryOne({navigation}) {
        const userData = useSelector(state => state)

       const [historyData, sethistoryData] = useState([])


       useEffect(() => {
        const storageRef = db.collection("PetPosts")
       storageRef.where("uid", "==", userData.uid).where("active","==",true).onSnapshot((querySnapshot) => {
              var data = [];
              querySnapshot.forEach((doc) => {
                  data.unshift(doc.data());
              });
              sethistoryData(data)
           
          });
       }, [])
        

                
    return (
       <View style={{margin:10,flex:1}} >
           <TouchableHighlight onPress={()=> navigation.navigate("Pasthistory")}
           style={{ backgroundColor:'#6200EE',padding:10,borderRadius:5}}>
               <Text style=
               {{fontSize:21,color:'white'
            }}>Check your Past Requests here</Text>
               </TouchableHighlight>
               <Divider style={{marginBottom:3,height:2}} />
            {(historyData!=[])?<FlatList
        data={historyData}
        keyExtractor={item => item.key}
        // renderItem={(itemData)=> <HistoryShow PostInfo={itemData.item}/>}
        renderItem={(itemData)=> <HistoryShow PostInfo={itemData.item} navigation={navigation}/>}
   
        ListEmptyComponent={<Text  style={{fontSize:21,marginTop:30}}>Nothing here.  when you post somwthing it'll show here</Text>}
        />:<Text  style={{fontSize:45}}>Nothing here.when you post something it'll show here</Text>}
            
      

       </View>
    )
}
