import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import RecommendationCard from './RecommendationCard';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

const ImagesTrial = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const func = async () => {
      try {
        const getImage = await axios.get('https://dummyjson.com/products');
        const val = await getImage.data.products;
        setProducts(val);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  const renderCarouselItem = ({item}) => (
    <View style={{width: '70%', height: 200, marginBottom: 10}}>
      <Image source={{uri: item}} style={{flex: 1, borderRadius: 10}} />
    </View>
  );

  return (
    <SafeAreaView>
      {products.map((product, index) => {
        return (
          <Card containerStyle={{margin: 30, borderRadius: 10}}>
            <View>
              <View key={index} style={{width: '50%', padding: 5}}>
                <Carousel
                  data={product.images}
                  renderItem={renderCarouselItem}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width - 40} // Adjust as needed
                  loop={true}
                />

                <View style={{padding: 1, flexDirection: 'row'}}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{fontSize: 18, fontWeight: 'bold'}}>
                    {product.title}
                  </Text>
                </View>
                <Text numberOfLines={4} ellipsizeMode="tail">
                  {product.description}
                </Text>
              </View>
            </View>
          </Card>
        );
      })}
    </SafeAreaView>
  );
};
export default ImagesTrial;
