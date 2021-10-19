import React, { useState, useEffect } from 'react'
import { Alert, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import  { db } from '../fierbaseConfiguration'



export default function HistoryShow({PostInfo,navigation}) {
    function deletePost(key){
          
        db.collection("PetPosts").doc(key).delete().then(()=>{
            Alert.alert("Deleted","Your data has been completely deleted")
           
        }).catch((e)=>{
            Alert.alert("delete failed",e.message)
           
        })}
        return(
                    <View style={style.petshowContainer}>
                    <Image source={{uri:PostInfo.Image}}
                    style={{width:150,height:175,borderTopLeftRadius:10,borderBottomLeftRadius:10,}}
                    resizeMode='cover'
                
                    />
                   <View style={{margin:10}}>
                       <Text style={{fontSize:25}}>{PostInfo.Name}</Text>
                     <View style={{flexDirection:'row',alignItems:'center'}}>
                         <Text  style={{fontSize:15,marginRight:20}}> {PostInfo.Breed}</Text>
                         <Button mode='text' color={(PostInfo.Gender==="Male")?'blue':'red'} >{PostInfo.Gender}</Button>
                         </View>
                         <Text style={{marginBottom:5}}>Available for : </Text>
                         <Text>{Date(PostInfo.From_Date).slice(4,15)} to {Date(PostInfo.To_Date).slice(4,15)} </Text>
                        
                        <View style={{flexDirection:'row',marginTop:10,justifyContent:"center"}}>  
                        <Button mode="contained" onPress={()=>{
                            // console.log(navigation);
                            navigation.navigate("requests",PostInfo)
                         }}
                         style={{marginRight:10}}
                         >Requests</Button>
                           <TouchableOpacity  onPress={()=>deletePost(PostInfo.key)}><Avatar.Icon icon="delete" size={35}
                           /></TouchableOpacity>
                            {/* <Button mode="contained" icon="delete"
                            
                         ></Button> */}

                       </View>
                   </View>
                </View>
                );
}
const style = StyleSheet.create({
    petshowContainer:{
        backgroundColor:'#cfcdc8',
        borderRadius:10,
        flexDirection:'row',
        marginBottom:15,
    }
})