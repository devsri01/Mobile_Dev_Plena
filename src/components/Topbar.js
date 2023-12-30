import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Dimensions } from "react-native";

import { Input, SearchBar } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Cart from "../screens/ShoppingCart";

const Search = () =>{
    const [search,setSearch] = useState("");
    let handelChangeText = (text) =>{
        setSearch(text);
    }
    return (
        <View style={{ backgroundColor: '#153075', borderRadius:50,width:'70%', flexDirection:"row"} }>
        <View style={{padding:10}}><MaterialIcons name='search' size={30} color= 'white'/></View>
        <TextInput
        placeholder="Type Here..."
        placeholderTextColor="#8891A5" 
        onChangeText={handelChangeText}
        value={search}
        style={{color:'#fff'}}
      />
        </View>
        
    )
}

const Topbar = ({navigation}) => {
    const winH = Dimensions.get('window').height*0.3;
    return (
    <SafeAreaView >
    <View style={{height:winH, backgroundColor:'#2A4BA0', justifyContent:'space-evenly'}}>
        <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'white',fontSize:20,marginLeft:15}}>Hey,Rahul</Text>
        <TouchableOpacity style={{marginRight:15}} onPress={() => navigation.navigate('Cart')} >
        <MaterialIcons name='shop' size={30} color= 'white'/>
        </TouchableOpacity>
        </View>
        <View style={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
        <Search/>
        </View>
        <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
        <View >
        <Text style={{marginLeft:15,color:'#F8F9FB'}}>Delivery To</Text>
        <Text style={{marginLeft:15,color:'white',fontSize:10}}>Green Way 3000, Sylhet</Text>
        
        </View>
        <View >
        <Text style={{marginRight:15,color:'#F8F9FB'}}>WITHIN</Text>
        <Text style={{color:'#F8F9FB',fontSize:10}}>1 Hour</Text>
        </View>
        </View>
    </View>
    </SafeAreaView>
    )
}

export default Topbar