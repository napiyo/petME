import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState ,useMemo} from 'react'
import { FlatList, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator, Button, Searchbar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { db } from '../fierbaseConfiguration'
import ItemBox from './ItemBox'

export default function HomeTab({navigation}) {
    const userData = useSelector(state => state)
    const [PostData, setPostData] = useState([])
    const [PostLoaded, setPostLoaded] = useState(false)
    const [searchQuery, setsearchQuery] = useState("")
    const [refreshingFlatList, setrefreshingFlatList] = useState(false)
    

    // fetch data from firebase
   useEffect(() => {
       setrefreshingFlatList(true)
       const storageRef = db.collection("PetPosts")
     if(searchQuery =='' || searchQuery == " ") { storageRef.where("active", "==", true).onSnapshot((querySnapshot) => {
           var data = [];
           querySnapshot.forEach((doc) => {
               data.unshift(doc.data());
           });
          setPostData(data)
          setPostLoaded(true)
          setrefreshingFlatList(false)
       });}
       else{
        storageRef.where("active", "==", true).where("Breed",">=",searchQuery).where("Breed","<=",searchQuery+'\uf8ff').onSnapshot((querySnapshot) => {
            var data = [];
            querySnapshot.forEach((doc) => {
                data.unshift(doc.data());
            });
           setPostData(data)
           setPostLoaded(true)
           setrefreshingFlatList(false)
        });

       }
   }, [searchQuery])
   function gotohero(key){
       console.log(key);
   }
   
  
 
   

    return (<View style={style.MainContainer}>
            <StatusBar style="dark"/> 
            <Text style={{fontSize:25}}>Hi {userData.Name}</Text>
            <Searchbar style={style.searchBar} placeholder="search Breed (Germen , pub)" value={searchQuery}
            onChangeText={text=>setsearchQuery(text)}/>
        <View>
            <Text style={{fontSize:17,marginVertical:12,fontWeight:'600'}}>Will you PetME ? </Text>
        </View>        
       {(PostLoaded)?(<FlatList
        data={PostData}
        keyExtractor={item => item.key}
        renderItem={(itemData)=> <ItemBox PostInfo={itemData.item} />}
       
         
   ListEmptyComponent= {<Text style={{margin:20,textAlign:'center',fontSize:25}}>Nothing Found</Text>}
        initialNumToRender={10}
        refreshing={refreshingFlatList}
        onRefresh={()=>setsearchQuery('')}
         />):<ActivityIndicator style={{marginTop:20}}/>}

       </View>
      
    )
}
const style = StyleSheet.create({
    MainContainer:{
        flex:1,
        paddingTop:40,
        padding:10,
        
        
    },
    searchBar:{
        marginVertical:10,
        borderRadius:15,
        padding:5,
    },
    petshowContainer:{
        backgroundColor:'#8600e9',
        borderRadius:10,
        flexDirection:'row',
        marginBottom:15,
    }
})
