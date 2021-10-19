import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { ActivityIndicator, Avatar, Divider } from 'react-native-paper'
import {db} from "../fierbaseConfiguration"

export default function Requests({route,navigation}) {
   
    const PostData = route.params
    

    const [PageLoaded, setPageLoaded] = useState(false)
    const [FlatListData, setFlatListData] = useState([])
   useEffect(() => {
       
       if(PostData.requests.length===0){
           setPageLoaded(true)
       }
       else{
            let temp = []
     PostData.requests.forEach(async (element) => {
     
           await db.collection("userPersonalData").doc(element).get().then((data)=>{
               data = data.data()
            let EachD = {key:element,Name:data.Name,url:data.profileDp}
            temp.unshift(EachD)
                if(PostData.requests.indexOf(element)===PostData.requests.length - 1){
                    setPageLoaded(true)
                    setFlatListData(temp)
                }
           }).catch((e)=>{
               console.log(e);
           })
           
     })
     
           
       }
  
   }, [])
   function approveRequest(data){
       setPageLoaded(false)
       db.collection("PetPosts").doc(PostData.key).update({
           requests:[data.key,data.Name,data.url],active:false
       }).then((e)=>{
           Alert.alert("aprroved","you have accepted request. thanks. ")
           navigation.navigate("historyOne")
       }).catch((e)=>{
           setPageLoaded(true)
           Alert.alert("something went wrong",e.message)
       })
   }

   function approve(data){
       Alert.alert(`Approve ? ${data.Name}`, `are you sure? you want to approve request of ${data.Name} for your ${PostData.Name}`,
       [{text:"yes",onPress:()=>{ approveRequest(data)} },{text:"cancel",style:'cancel'}])
       
   }
    return (
        <View style={style.MainConatiner}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
           <Avatar.Image source={{uri:PostData.Image}} 
           
           size={80}/><Text style={style.headLine}> Requests for {PostData.Name}</Text>
           </View>
           <Divider style={{marginTop:10,height:2 }}/><View style={{flexDirection:'row',alignItems:'center',margin:5}}>
               <Avatar.Icon size={10} style={{marginRight:10,backgroundColor:(PostData.active)?"green":"red"}}  /> 
              <Text>status : {(PostData.active)?"active":"inactive"}</Text>
    </View>

   {(PageLoaded)?<FlatList
    data={FlatListData}
    renderItem={(itemData)=>{
        let data = itemData.item;
        return(
        <View style={style.flatItem}>
             <View style={{flexDirection:'row',alignItems:'center'}}>
             {(data.url != "NA")?(<Avatar.Image source={{uri:data.url}} 
             size={50}/>):<Avatar.Text size={50} label={data.Name.substring(0,2).toUpperCase()}/>}
      <Text style={style.flatItemName} >{data.Name}</Text></View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableHighlight onPress={()=>approve(data)}><Avatar.Icon icon="check-circle-outline" size={40} style={{marginRight:10}}/></TouchableHighlight>
  
      </View>
        </View>);
    }}
    
     ListEmptyComponent={<Text style={{fontSize:20,textAlign:'center'}}>No requests yet</Text>}
    >

    </FlatList>:<ActivityIndicator />}
        </View>
    )
}
const style= StyleSheet.create({
    MainConatiner:{
        flex:1,
        paddingHorizontal:10,
        marginTop:7,
    },
    headLine:{
        fontSize:21,
        marginLeft:10
    },
    flatItem:{
        borderRadius:5,
        backgroundColor:'#cfcdc8',
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        
       
    },
    flatItemName:{
        fontSize:18,
        marginLeft:10,
    },
    
})