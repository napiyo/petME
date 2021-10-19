import React, { useState,useRef } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { db, storage } from '../fierbaseConfiguration';


export default function CreatePost({navigation}) {
    
    const todayDate = new Date()
// console.log(todayDate.Iso);
    const [ImageUrl, setImageUrl] = useState()
    const [showLoading, setshowLoading] = useState(false)
   
    const [From_Date, setFrom_Date] = useState(todayDate)
    const [To_Date, setTo_Date] = useState(new Date(todayDate))
    const[DatePickerMode, setDatePickerMode] = useState('date');
//   const [showDatePickerMode, setShowDatePickerMode] = useState(true);
  const [shiftKeyBoard, setshiftKeyBoard] = useState(false);
  const [PetDetails, setPetDetails] = useState({Name:"",Age:"",Breed:"",Gender:''})
  const AgeRef = useRef(null)

     const userData = useSelector(state => state)
   
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
  const uploadpostData=(url,timestamp)=>{
    db.collection("PetPosts").doc(timestamp).set({...PetDetails,From_Date,To_Date,Image:url,key:timestamp,uid:userData.uid,active:true,requests:[]}).then(()=>{
        // data uploaded successfully
        setshowLoading(false)
        Alert.alert("Successed","Your Request has been Posted")

        navigation.navigate("HomeTab")
  }).catch((e)=>{
      Alert.alert("Sorry..",e.message)
  })
}

const getBlob= async()=>{
    let response = await fetch(ImageUrl)
    let blob = await response.blob()
  
    uploadPost(blob)
}



const uploadPost =(blob)=>{
    let d = new Date()
    let timestamp = d.getTime().toString()
    
    storage.ref().child("Posts").child(userData.uid).child(timestamp).put(blob).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((url)=>{

            uploadpostData(url,timestamp)

        }).catch(()=>{
            uploadpostData("ABE")
        })
    }).catch((e)=>{
        Alert.alert("upload Failed",e.message)
    })

   
    
}

  const Validation=()=>{
            if(!ImageUrl){
                Alert.alert("All Feilds are Required","Please select an Image of your Pet")
                return
            }
            if(!PetDetails.Name){
                Alert.alert("All Feilds are Required","Please enter Name of your Pet")
                return
            }
            if(!PetDetails.Age){
                Alert.alert("All Feilds are Required","Please enter Age of your Pet")
                return
            }
            if(!PetDetails.Breed){
                Alert.alert("All Feilds are Required","Please enter Breed of your Pet")
                return
            }
            if(!PetDetails.Gender){
                Alert.alert("All Feilds are Required","Please enter Gender of your Pet")
                return
            }
            setshowLoading(true)
            getBlob()
  }






    return (
        <KeyboardAvoidingView style={style.MainContainer} 
        enabled={shiftKeyBoard}
        behavior="position">
         <ScrollView style={{width:'100%'}} >
        <View style={style.MainContainer}>
            <View style={style.chooseDpContainer}>
  <TouchableOpacity onPress={openImagePickerAsync} style={style.chooseDpContainer}>
{(!ImageUrl)?(<><Avatar.Icon size={70} icon="camera-plus-outline" style={{marginEnd:10}} />
<Text>Choose a cool  Dp for your Pet</Text></>):
 (<><Avatar.Image size={70} source={{uri:ImageUrl}} style={{marginEnd:10}}/>
 
  <Text>Choose another Image?</Text>
  <Button mode="text" icon="delete" style={{fontSize:40}}  onPress={()=>{
      setImageUrl('')
  }}>Remove</Button>
  </>
 )}
  </TouchableOpacity>
  </View>
  <View style={style.divider} ></View>
  <Text style={{marginBottom:10}}>Your Pet Details</Text>

 
  <View style={style.Input}><TextInput label="Name" 
  value={PetDetails.Name}
  onChangeText={text => setPetDetails({...PetDetails,Name:text})}
  returnKeyType='next'
  onSubmitEditing={()=>AgeRef.current.focus()}
  />
  
  </View>

  <View style={style.Input}>
      <TextInput label="Age" 
  keyboardType='numeric'
  returnKeyType='next'
  maxLength={2}
  ref={AgeRef}
  value={PetDetails.Age}
  onChangeText={(text)=>setPetDetails({...PetDetails,Age:text})}
  />
  </View>
  <View style={style.Input}>
      <TextInput label="Breed"
      value={PetDetails.Breed}
      onChangeText={(text)=>setPetDetails({...PetDetails,Breed:text})}
      onFocus={()=>setshiftKeyBoard(true)}
      onBlur={()=>{
          setshiftKeyBoard(false)
      }}
      
      />
      </View>
  <View style={{flexDirection:'row',marginVertical:10}}>
      <Button mode={(PetDetails.Gender==="Male")?'contained':'outlined'} style={{marginRight:30}}
      onPress={()=>setPetDetails({...PetDetails,Gender:"Male"})}
      >Male</Button>
      <Button mode={(PetDetails.Gender==="Female")?'contained':'outlined'}
        onPress={()=>setPetDetails({...PetDetails,Gender:"Female"})}
      >Female</Button>
      </View>
  
 
    
  <Text>choose Date  till you want someone to take care of your pet</Text>

   { (Platform.OS=="ios") && <View style={{flexDirection:'row',width:'100%',marginVertical:6,marginLeft:21}}>
    
    <DateTimePicker
          testID="dateTimePicker"
          value={From_Date}
          mode='date'
          is24Hour={true}
          display="default"
          style={{flex:1}}
          
          onChange={(e,date)=>setFrom_Date(date)}
        />
    
        <Text style={{marginLeft:-25,marginRight:20, textAlign:'center',fontSize:17}} >To</Text>
   
         <DateTimePicker
          testID="dateTimePicker"
          value={To_Date}
          mode='date'
          is24Hour={false}
          display="default"
          style={{flex:1}}
          onChange={(d,date)=>setTo_Date(date)}
        />


    </View>}
    <Button mode="contained" style={{marginVertical:16, width:'100%',marginBottom:66}}
    onPress={Validation}
    loading={showLoading}
    >Post</Button>
  

            
        </View>
  </ScrollView>
  </KeyboardAvoidingView>
    )
}
const style = StyleSheet.create({
    MainContainer:{
        flex:1,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:5,
    },
    chooseDpContainer:{
        flexDirection:'row',
        marginBottom:10,
        marginTop:10,
        alignItems:'center',
        width:'100%'
        // justifyContent:'center'
},
divider:{
    width:'100%',
    borderBottomColor:'black',
    borderBottomWidth:1,
    marginBottom:10,
   
},
Input:{
    width:'100%',
    marginBottom:5,
   
    
},
calendarField:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'center',
    marginTop:10,
    alignItems:'center'
}


})