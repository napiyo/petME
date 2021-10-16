import { StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react'
import {  Keyboard, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback ,View } from 'react-native'
import {  TextInput,Button,HelperText, Snackbar,ActivityIndicator } from 'react-native-paper';
import auth from '../../fierbaseConfiguration';
import SignUpScreen from './SignUpScreen';




export function LoginScreen({navigation}){
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [showLoader, setshowLoader] = useState(false)
    const [SnackbarState, setSnackbarState] = useState({visible:false,message:"I'm snackBar"})
    const PasswordRef = useRef(null)
     const [EmailError, setEmailError] = useState({isError: false , ErrorMessage:""})
     const [PasswordError, setPasswordError] = useState({isError: false , ErrorMessage:""})
    const Login=()=>{
        auth.signInWithEmailAndPassword(Email, Password).then((credential)=>{
            const user= credential.user;
            setshowLoader(false)
           
            navigation.dispatch(
                StackActions.replace('HomeScreen')
              );
              navigation.navigate('HomeScreen');
        }).catch((e)=>{
            setSnackbarState({visible:true,message:e.message})
            setshowLoader(false)
        })
          
    }
    const ValidationOfForm=()=>{
        if(!Email){
            setEmailError({isError:true,ErrorMessage:"Email is Required"})
          
            return
        }
        if(!!Email && !Email.includes('@')){
                 setEmailError({isError:true,ErrorMessage:"must include @"})
                 return
        }
        if(!Password){
            setPasswordError({isError:true,ErrorMessage:"Password is required"})
            return
        }
        if(!!Password && Password.length<6){
            setPasswordError({isError:true,ErrorMessage:"Password must be at least 6 character long"})
            return
        }
        Keyboard.dismiss()
        setshowLoader(true)
        Login()
       

    }
    
   
    return (
        <>
        
        <KeyboardAvoidingView 
         behavior={Platform.OS === "ios" ? "padding" : "height"}>
             
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
            >
                
            <View style={style.MainContainer}>
                <View>
            

{/* Email Input  */}

            <TextInput
                label="Email"
                value={Email}
                onChangeText={text => {
                    //update of email
                    setEmail((text))
                    //remove error
                    if(EmailError.isError){
                        setEmailError({isError:false,ErrorMessage:""})
                    }
               
                }}
                style={style.InputItems}
                returnKeyType="next"
                onSubmitEditing={() => {
                    PasswordRef.current.focus();
                 }} 
                 autoCompleteType='email'
                 error={EmailError.isError}
            
                />
                
                <HelperText type="error" visible={EmailError.isError}>
        {EmailError.ErrorMessage}
      </HelperText>

 {/* Password input  */}

                <TextInput 
                    placeholder ="Enter your password"
                    label="Password"
                    value={Password}
                    onChangeText={text => {
                        setPassword(text)
                        if(PasswordError.isError)
                        {setPasswordError({isError:false,ErrorMessage:""})}
                    }}
                    style={style.InputItems}
                    ref={PasswordRef}
                    autoCompleteType='password'
                    secureTextEntry= {true}
                />         
                <HelperText type="error" visible={PasswordError.isError}>
        {PasswordError.ErrorMessage}
      </HelperText>
                <Button  
                mode="contained"
                style={style.LoginButton}
                onPress={ValidationOfForm}
                >
                {/* show loader when trying to login after validating form */}
               {(showLoader)? <ActivityIndicator animating={true} color='white' />: "Log in"}
                </Button>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={()=> navigation.navigate("SignUpScreen")}>
                     <Text style={style.signupText}>Don't have an Account ? Sign Up here</Text>
                    </TouchableWithoutFeedback>
                    </View>
                  
        </View>
       
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {/* snalbar */}
        <Snackbar
        visible={SnackbarState.visible}
        onDismiss={()=>setSnackbarState({visible:false,message:""})}
        action={{
          label: 'Ok',
          onPress: () => {
            setSnackbarState({visible:false,message:"I'm changed"})
          },
        }}>
        {SnackbarState.message}
      </Snackbar>
     
        </>
        
    )

}







export default function AuthScreens() {
    const StackAuth = createNativeStackNavigator()
    return (
        
        
        <StackAuth.Navigator  initialRouteName="LoginScreen">
            <StackAuth.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
           
            <StackAuth.Screen name ="SignUpScreen" component={SignUpScreen} options={{title:"Welcome"}} />
          
            
        </StackAuth.Navigator>
       
        
    )
}
const style  = StyleSheet.create({
    MainContainer:{
        height:"100%",
        paddingTop:"20%",
        paddingHorizontal:20,
        justifyContent:'flex-start',
        alignContent:'center',
    },
    InputItems:{
        // marginBottom:10,
    },
    LoginButton:{
        marginBottom:10,
        padding:5,
    },
    signupText:{
        textAlign:'center',
        marginTop:20,
        fontWeight:'bold',
    }



})

