import { StackActions } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux';
import auth from '../fierbaseConfiguration'

export default function ProfileTab({navigation}) {

        const userData = useSelector(state => state)
    const LogOut=()=>{
        auth.signOut().then(()=>{
            navigation.dispatch(
                StackActions.replace('AuthScreens')
              );
              
          navigation.navigate('AuthScreens')  
        }).catch((e)=>{
            console.log(e);
        })
    }
    return(
        <View style={style.MainContainer}>
            <View style={{flexDirection:'row',marginBottom:20}}> 
         <View style={{marginRight:20}}>
             {(userData.DPurl != "NA")?(<Avatar.Image source={{uri:userData.DPurl}} size={80}/>):<Avatar.Text size={175} label={userData.Name.substring(0,2).toUpperCase()}/>}</View>
            <TextInput editable={false} style={{flex:1,fontSize:21,}} label="Name" value={userData.Name}></TextInput>
        </View>
        <TextInput editable={false} style={{fontSize:21,marginBottom:20}} label="Email" value={userData.Email}></TextInput>
        <Button
        mode="contained"
        onPress={LogOut}>
        Log Out</Button>
        
       
        
        </View>
    )
}
const style =StyleSheet.create({
    MainContainer:{
        flex:1,
        margin:20
    }
})
