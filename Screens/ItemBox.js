import React, { useEffect, useState ,useMemo} from 'react'
import { Alert, FlatList, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, Button, Searchbar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import {db} from '../fierbaseConfiguration'
import firebase from 'firebase'
export default function ItemBox({PostInfo}) {
    const userData = useSelector(state => state)
    
    const [btntext, setbtntext] = useState("petMe")
    const [showloading, setshowloading] = useState(false)
    const sendrequest=()=>{
        setshowloading(true)
     const storageRef = db.collection("PetPosts").doc(PostInfo.key);
     storageRef.update({requests:firebase.firestore.FieldValue.arrayUnion(userData.uid)}).then(()=>{
         setbtntext("requested")
         setshowloading(false)
        }).catch((e)=>{
         setshowloading(false)
         Alert.alert("Error",e.message)
     })

    }
    return (
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
             <Button mode="contained" 
             style={{marginTop:10}}
            onPress={sendrequest}
            disabled={btntext=="requested"}
            loading={showloading}
              
              >{btntext}</Button>
       </View>
    </View>
    )
}
const style = StyleSheet.create({
   
    petshowContainer:{
        backgroundColor:'#d5dded',
        borderRadius:10,
        flexDirection:'row',
        marginBottom:15,
    }
})
