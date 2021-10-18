import React, { useState, useEffect } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import  { db } from '../fierbaseConfiguration'

export default function History() {
        const userData = useSelector(state => state)

       const [historyData, sethistoryData] = useState([])


       useEffect(() => {
        const storageRef = db.collection("PetPosts")
       storageRef.where("uid", "==", userData.uid).onSnapshot((querySnapshot) => {
              var data = [];
              querySnapshot.forEach((doc) => {
                  data.unshift(doc.data());
              });
              sethistoryData(data)
           
          });
       }, [])
        
    const HistoryView=(PostInfo)=>{

         
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
                             <Button mode="contained" style={{marginTop:10}} 
                           
                             onPress={()=>deletePost(PostInfo.key)}>Delete</Button>
                       </View>
                    </View>
                    );
    }
    return (
       <View style={{margin:10}}>
            {(historyData!=[])?<FlatList
        data={historyData}
        keyExtractor={item => item.key}
        renderItem={(itemData)=> HistoryView(itemData.item)}
        />:<Text  style={{fontSize:45}}>Nothing here.  when you post somwthing it'll show here</Text>}


       </View>
    )
}
const style = StyleSheet.create({
    petshowContainer:{
        backgroundColor:'#cfcdc8',
        borderRadius:10,
        flexDirection:'row',
        marginBottom:15,
    }
})
