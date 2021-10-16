import { StackActions } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import auth from '../fierbaseConfiguration'

export default function Home({navigation}) {
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
    return (
        <View style={style.MainContainer}>
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
        justifyContent:'center',
        alignItems:'center'
    }
})
