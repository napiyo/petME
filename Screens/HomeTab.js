import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, TouchableWithoutFeedbackBase, View } from 'react-native'
import { Button, Searchbar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { db } from '../fierbaseConfiguration'
import ItemBox from './ItemBox'

export default function HomeTab({navigation}) {
    const userData = useSelector(state => state)
    const [PostData, setPostData] = useState([])
    const [PostLoaded, setPostLoaded] = useState(false)
    const [searchQuery, setsearchQuery] = useState("")
    

    // fetch data from firebase
   useEffect(() => {
       const storageRef = db.collection("PetPosts")
     if(!searchQuery) { storageRef.where("active", "==", true).onSnapshot((querySnapshot) => {
           var data = [];
           querySnapshot.forEach((doc) => {
               data.unshift(doc.data());
           });
          setPostData(data)
          setPostLoaded(true)
       });}
       else{
        storageRef.where("active", "==", true).where("Breed","==",searchQuery).onSnapshot((querySnapshot) => {
            var data = [];
            querySnapshot.forEach((doc) => {
                data.unshift(doc.data());
            });
           setPostData(data)
           setPostLoaded(true)
        });

       }
   }, [searchQuery])
   
  
   
   

    return (
 
        <View style={style.MainContainer}>
            <StatusBar style="dark"/> 
            <Text style={{fontSize:25}}>Hi {userData.Name}</Text>
            <Searchbar style={style.searchBar} placeholder="search Breed or gender " value={searchQuery}
            onChangeText={text=>setsearchQuery(text)}/>
        <View>
            <Text style={{fontSize:17,marginVertical:12,fontWeight:'600'}}>Will you PetME ? </Text>
        </View>        
       {(PostLoaded)?(<FlatList
        data={PostData}
        keyExtractor={item => item.key}
        renderItem={(itemData)=> <ItemBox PostInfo={itemData.item} />}
        />):<Text>loading...</Text>}
        </View>
      
    )
}
const style = StyleSheet.create({
    MainContainer:{
        flex:1,
        paddingTop:40,
        padding:10,
        
        
    },
    searchBar:{
        marginVertical:10,
        borderRadius:15,
        padding:5,
    },
    petshowContainer:{
        backgroundColor:'#cfcdc8',
        borderRadius:10,
        flexDirection:'row'
    }
})
