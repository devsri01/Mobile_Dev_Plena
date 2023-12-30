import React from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {Button, Card, ListItem} from 'react-native-elements';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const viewCartItems = async () => {
  try {
    const cartItems = await AsyncStorage.getItem('CartItems');
    console.log('Cart Items:', JSON.parse(cartItems));
  } catch (error) {
    console.error('Error retrieving cart items:', error);
  }
};

const AddToCart = async (id,name,price,navigation,image ) => {
  try {
    let itemArray = await AsyncStorage.getItem('CartItems');
    itemArray = JSON.parse(itemArray) || [];

    itemArray.push([id,name,price,image]);

    await AsyncStorage.setItem('CartItems', JSON.stringify(itemArray));
    viewCartItems();

    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    navigation.navigate('Homepage');
  } catch (error) {
    console.error('Error adding to cart:', error);
    return error;
  }
};

const Product = ({route, navigation}) => {
  const {data, imgarr} = route.params;

  const firstItem = data[0];
  const name = firstItem.name;
  const description = firstItem.description;
  const price = firstItem.price;
  const discount = firstItem.discount;
  const id = firstItem.id;
  const image = firstItem.imageUrl;

  const renderCarouselItem = ({item}) => (
    <View style={{width: '80%', height: 350}}>
      <Image source={{uri: item}} style={{flex: 1, borderRadius: 10}} />
    </View>
  );

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{marginLeft: 15, marginTop: 15}}
          onPress={() => navigation.navigate('Homepage')}>
          <Foundation name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 15, marginTop: 15}}
          onPress={() => navigation.navigate('Cart')}>
          <MaterialIcons name="shop" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Card
        containerStyle={{
          borderRadius: 10,
          height: Dimensions.get('window').height * 0.85,
        }}>
        <View>
          <View>
            <View>
              <Text
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {name}
              </Text>
            </View>
            <Carousel
              data={imgarr}
              renderItem={renderCarouselItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              loop={true}
            />
            <View
              style={{
                padding: 5,
                fontSize: 15,
                fontWeight: 'bold',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{padding: 5, color: '#2A4BA0'}}>Rs {price}</Text>
              <Text
                style={{
                  borderRadius: 10,
                  padding: 5,
                  backgroundColor: '#2A4BA0',
                  color: 'white',
                }}>
                {discount} OFF
              </Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                onPress={() => {
                  AddToCart(id,name,price,navigation,image);
                }}>
                <Text
                  style={{
                    color: '#2A4BA0',
                    borderRadius: 30,
                    borderColor: '#2A4BA0',
                    borderStyle: 'solid',
                    borderWidth: 1.5,
                    padding: 25,
                  }}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor: '#2A4BA0',
                    color: 'white',
                    borderRadius: 30,
                    padding: 25,
                  }}>
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 10, flexDirection: 'column'}}>
              <Text style={{fontSize: 16, color: 'black'}}>Details</Text>
              <Text>{description}</Text>
            </View>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
};
export default Product;
