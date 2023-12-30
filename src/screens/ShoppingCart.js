import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Foundation from 'react-native-vector-icons/Foundation';

const ShoppingCard = ({ navigation }) => {
  const [cartArrayItems, setCartArrayItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [frequencyItem, setFrequencyItem] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('CartItems');
        const parsedCartItems = JSON.parse(storedCartItems) || [];
        
        const frequencyDict = {};
        
        const uniqueItems = parsedCartItems.reduce((acc, item) => {
          const itemId = item[0];
          if (!frequencyDict[itemId]) {
            frequencyDict[itemId] = 1;
            acc.push(item);
          } else {
            frequencyDict[itemId] += 1;
          }
          return acc;
        }, []);

        setCartArrayItems(uniqueItems);
        setFrequencyItem(frequencyDict);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartArrayItems, frequencyItem]);

  const updateFrequency = (itemId, operation) => {
    setFrequencyItem((prevFrequency) => {
      const newFrequency = { ...prevFrequency };

      if (operation === 'add') {
        newFrequency[itemId] = newFrequency[itemId] ? newFrequency[itemId] + 1 : 1;
      } else if (operation === 'subtract' && newFrequency[itemId] > 0) {
        newFrequency[itemId] -= 1;

        if (newFrequency[itemId] === 0) {
          removeItemFromCart(itemId);
        }
      }

      return newFrequency;
    });
  };

  const removeItemFromCart = async (itemId) => {
    // Remove the item from cartArrayItems
    setCartArrayItems((prevItems) => prevItems.filter((item) => item[0] !== itemId));

    // Update frequencyItem
    updateFrequency(itemId, 'subtract');

    // Fetch the current cart items from AsyncStorage
    try {
      const storedCartItems = await AsyncStorage.getItem('CartItems');
      const parsedCartItems = JSON.parse(storedCartItems) || [];

      // Remove all occurrences of the item from AsyncStorage
      const updatedCartItems = parsedCartItems.filter((item) => item[0] !== itemId);
      await AsyncStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartArrayItems.forEach((item) => {
      totalPrice += item[2] * (frequencyItem[item[0]] || 0);
    });
    setPrice(totalPrice);
  };

  return (
    <ScrollView>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginLeft: 15, marginTop: 15 }}
          onPress={() => navigation.navigate('Homepage')}>
          <Foundation name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 15, marginTop: 15, fontSize: 25 }}>
          Shopping Cart
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center ',
          alignItems: 'center',
        }}>
        {cartArrayItems.map((item, index) => {
          frequencyItem[item[0]] = frequencyItem[item[0]] || 1;
          return (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 15,
                padding: 10,
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              <Image
                source={{ uri: item[3] }}
                style={{ width: 100, height: 100, borderRadius: 20 }}
              />
              <View>
                <View style={{ padding: 5 }}>
                  <Text>{item[1]}</Text>
                  <Text>Price: Rs{item[2]}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    width: '80%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      updateFrequency(item[0], 'add');
                    }}>
                    <Foundation name="plus" size={30} color="black" />
                  </TouchableOpacity>
                  <Text>{frequencyItem[item[0]]}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      updateFrequency(item[0], 'subtract');
                    }}>
                    <Foundation name="minus" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      removeItemFromCart(item[0]);
                    }}>
                    <Foundation name="trash" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
        <Text>Subtotal: {price}</Text>
      </View>
    </ScrollView>
  );
};

export default ShoppingCard;
