import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Avatar, Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { db } from '../fierbaseConfiguration'

export default function Pasthistory() {
    const userData = useSelector(state => state)
    const [PageLoaded, setPageLoaded] = useState(false)
    const [PastData, setPastData] = useState([])
    useEffect(() => {
        const storageRef = db.collection("PetPosts")
       storageRef.where("uid", "==", userData.uid).where("active","==",false).get().then((querySnapshot)=>{
        var data = [];
        querySnapshot.forEach((doc) => {
            data.unshift(doc.data());
        });
        setPastData(data)
        setPageLoaded(true)
       }).catch((e)=>{
           Alert.alert("something went wrong",e.message)
           setPageLoaded(true)
       })
       }, [])

       const FlatView = (PostInfo)=>{
           
           return(
            <View style={style.petshowContainer}>
            <Image source={{uri:PostInfo.Image}}
            style={{width:135,height:135,borderTopLeftRadius:10,borderBottomLeftRadius:10,}}
            blurRadius={5}
            resizeMode='cover'
        
            />
           <View style={{margin:10}}>
               <Text style={{fontSize:25,marginBottom:5}}>{PostInfo.Name}</Text>
             
                 <Text style={{marginBottom:5}}>Requested for: </Text>
                 <Text>{Date(PostInfo.From_Date).slice(4,15)} to {Date(PostInfo.To_Date).slice(4,15)} </Text>
                 <Text style={{fontSize:17,marginTop:10,marginBottom:5}}>cared by {PostInfo.requests[1]}</Text>
                
               
           </View>
        </View>

           );
       }


    return (
       <View style={style.mainContainer}>
           {(PageLoaded==false)?<ActivityIndicator />:
           <FlatList
           data={PastData}
           renderItem={(ItemData)=> FlatView(ItemData.item)}
           ListEmptyComponent={<Text style={{textAlign:'center',fontSize:21,margin:15}}>No history Found</Text>}
           >
           </FlatList>
           
           }

       </View>
                );
}
const style = StyleSheet.create({
    petshowContainer:{
        backgroundColor:'#cfcdc8',
        borderRadius:10,
        flexDirection:'row',
        marginBottom:15,
    },
    mainContainer:{
        marginVertical:5,
        marginHorizontal:10,
    }
})