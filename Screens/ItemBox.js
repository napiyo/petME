import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function ItemBox({PostInfo}) {

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
             <Button mode="contained" style={{marginTop:10}}>PetME</Button>
       </View>
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
