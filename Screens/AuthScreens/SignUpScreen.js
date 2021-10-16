import React, { useRef, useState } from 'react'
import {  Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Text, TouchableWithoutFeedback ,View } from 'react-native'
import {  TextInput,Button,HelperText, Snackbar,ActivityIndicator ,Avatar} from 'react-native-paper';
import auth, { db, storage } from '../../fierbaseConfiguration';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


export default function SignUpScreen({navigation}) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Name, setName] = useState('')
    const [ImageUrl, setImageUrl] = useState('')
    const [showLoader, setshowLoader] = useState(false)
    const [SnackbarState, setSnackbarState] = useState({visible:false,message:"I'm snackBar"})
    const PasswordRef = useRef(null)
    const EmailRef = useRef(null)
     const [EmailError, setEmailError] = useState({isError: false , ErrorMessage:""})
     const [PasswordError, setPasswordError] = useState({isError: false , ErrorMessage:""})
     const [NameError, setNameError] = useState({isError: false , ErrorMessage:""})
  
//  Image picker function 
let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setImageUrl(pickerResult.uri);
  }
  // upload image to firebase called by signUp fiunction after form validation done
 
    
    

                // Create a reference to folder where we will store this images here we will save in userImages
                   

                    // Create a reference to 'images/mountains.jpg'
                    // let userImagesRef = storageRef.child(ImageUrl);
   

  
    const SignUp= async()=>{
       
        auth.createUserWithEmailAndPassword(Email, Password).then((credential)=>{

            const user= credential.user;
                // upload user profile picture to firebase storage

                        // create blob from local image url

                        const blob =   fetch(ImageUrl).blob();
                        // const blob =  response.blob();
                        let userImagesRef = storage.ref().child('userProfiles').child(uid)
                        const uploadTask = userImagesRef.put(blob)

                        // Now get download url and show image upload progress
                        uploadTask.on('state_changed', 
                                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  }, 
                  (error) => {
                    // Handle unsuccessful uploads
                    setSnackbarState({visible:true,message:error.message})
                  }, 
                  () => {
                    // Handle successful uploads on complete
                 
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                          //update details to firestore
                          db.collection("UserPersonalData").doc(user.uid).set({
                                      Name,
                                          DPsource:downloadURL,
                                 }).then(()=>{
                
                                console.log('data added');
                                }).catch((e)=>{
                            console.log("data",e.message);
                                     })
                                 })
                             
                    }).catch((e)=>{
                             console.log(e.message);                    });
                  }
                );
                
                
            
             
            setshowLoader(false)
            navigation.dispatch(
                StackActions.replace('HomeScreen')
              );
              navigation.navigate('HomeScreen');
       
    } 

     const ValidationOfForm=()=>{
         if(!Name){
             setNameError({isError:true,ErrorMessage:"Name is Required"})
             return
         }
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
        SignUp()
       

    }




    return (
        <>
        <SafeAreaView>
           <ScrollView>
        
        <KeyboardAvoidingView 
       behavior='position'
       style={{height:'100%'}}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.MainContainer}>
            <View>
  {/* choose profile picture */}
  <View style={style.chooseDpContainer}>
  <TouchableOpacity onPress={openImagePickerAsync} style={style.chooseDpContainer}>
{(!ImageUrl)?(<><Avatar.Icon size={70} icon="camera-plus-outline" style={{marginEnd:10}} />
<Text>Choose Profile Picture</Text></>):
 (<><Avatar.Image size={70} source={{uri:ImageUrl}} style={{marginEnd:10}}/>
 
  <Text>Choose another Image</Text>
  <Button mode="text" icon="delete" style={{fontSize:40}}  onPress={()=>{
      setImageUrl('')
  }}>Remove</Button>
  </>
 )}
  </TouchableOpacity>
  </View>
            {/* input for Name */}
            <TextInput
                label="Full Name"
                value={Name}
                onChangeText={text => {
                    //update of email
                    setName((text))
                    //remove error
                    if(NameError.isError){
                        setEmailError({isError:false,ErrorMessage:""})
                    }
               
                }}
         
                returnKeyType="next"
                onSubmitEditing={() => {
                    EmailRef.current.focus();
                 }} 
                 autoCompleteType='name'
                 error={NameError.isError}
            
            
            />
             <HelperText type="error" visible={NameError.isError}>
    {NameError.ErrorMessage}
  </HelperText>
            {/* Email Input  */}

        <TextInput
            label="Email"
            value={Email}
            ref={EmailRef}
            onChangeText={text => {
                //update of email
                setEmail((text))
                //remove error
                if(EmailError.isError){
                    setEmailError({isError:false,ErrorMessage:""})
                }
           
            }}
     
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

                ref={PasswordRef}
                autoCompleteType='password'
                secureTextEntry= {true}
            />         
            <HelperText type="error" visible={PasswordError.isError}>
    {PasswordError.ErrorMessage}
  </HelperText>
            <Button  
            mode="contained"
            style={style.SignUpButton}
            onPress={ValidationOfForm}
            // onPress={uploadImage}
            >
            {/* show loader when trying to login after validating form */}
           {(showLoader)? <ActivityIndicator animating={true} color='white' />: "Sign Up"}
            </Button>
            </View>
            <View>
                <TouchableWithoutFeedback onPress={()=> navigation.goBack()}>
                 <Text style={style.loginText}>Already have an account ? log in here</Text>
                </TouchableWithoutFeedback>
                </View>
            
    </View>
   
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
    {/* snackbar */}
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
const style  = StyleSheet.create({
    MainContainer:{
        height:"100%",
        paddingTop:20,
        paddingHorizontal:20,
        justifyContent:'flex-start',
        alignContent:'center',
        
    },
    SignUpButton:{
        marginBottom:10,
        padding:5,
    },
    loginText:{
        textAlign:'center',
        marginTop:20,
        fontWeight:'bold',
    },
    chooseDpContainer:{
            flexDirection:'row',
            marginBottom:10,
            marginTop:10,
            alignItems:'center'
            // justifyContent:'center'
    }
})