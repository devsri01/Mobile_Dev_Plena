import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecommendationCard from '../components/RecommendationCard';

const RecommendationCardCall = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        const fetchedProducts = await response.data.products;
        setProducts(fetchedProducts);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {products.map((product, index) => (
          <View key={index} style={{ width: '50%', padding: 5 }}>
            <RecommendationCard
              navigation={navigation}
              imageUrl={product.thumbnail}
              name={product.title}
              description={product.description}
              imgarr={product.images}
              price = {product.price}
              discount={product.discountPercentage}
              id={product.id}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default RecommendationCardCall;
