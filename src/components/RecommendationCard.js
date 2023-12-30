import React, { useState } from 'react';
import { Card, ListItem } from 'react-native-elements';
import {Text,View,Image, TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

const viewCartItems = async () => {
  try {
    const cartItems = await AsyncStorage.getItem('CartItems');
    console.log('Cart Items:', JSON.parse(cartItems));
  } catch (error) {
    console.error('Error retrieving cart items:', error);
  }
};

const AddToCart = async (id,name,price,image ) => {
  try {
    let itemArray = await AsyncStorage.getItem('CartItems');
    itemArray = JSON.parse(itemArray) || [];

    itemArray.push([id,name,price,image]);
    await AsyncStorage.setItem('CartItems', JSON.stringify(itemArray));
    viewCartItems();

    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return error;
  }
};


const RecommendationCard = ({ imageUrl, name, description ,navigation,price,discount,id,imgarr}) => {
  const [select,setSelect] = useState(false);
const handlePress = () =>{
  setSelect(!select);
}

    return (
      
      <Card containerStyle={{ height:350,  borderRadius: 10 }}>
      <TouchableOpacity onPress={handlePress}><MaterialIcons name={select ? "favorite" : "favorite-border"} size={30} color= {select ? "#FF8181": "#FF8181"} /></TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('Product', { data:[{name,description,price,discount,id,imageUrl}],imgarr })}>
       {/* {console.log(imgarr)} */}
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 150, borderRadius: 10,marginBottom:20 }}
        />
        </TouchableOpacity>
        <View style={{ padding: 1 }}>
        <View style={{ flexDirection: 'row'}}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
          <View style={{backgroundColor:'#2A4BA0',position:'absolute', borderRadius:50, width:30, height:30, right:0,top:-20, display:'flex', justifyContent:'center', alignItems:'center'}}><TouchableOpacity onPress={() =>{AddToCart(id,name,price,imageUrl)}}><MaterialIcons name="add" size={30} color="#FFFFFF" /></TouchableOpacity></View>
        </View>
          <Text numberOfLines={4} ellipsizeMode="tail">{description}</Text>
        </View>
      </Card>
    );
  };
  
export default RecommendationCard;