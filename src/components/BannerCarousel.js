import React from 'react'
import { Card, ListItem } from 'react-native-elements';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
  } from 'react-native';
import BannerCard from './BannerCard';

const slideList = Array.from({ length: 10 }).map((_, i) => {
    return {
      id: i,
      image: `https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww`,
    };
  });

  function Slide({ data }) {
    return (
       <BannerCard
        imageUrl={data.image}
       />
    );
  }
  
  function BannerCarousel() {
    return (
      <FlatList
        data={slideList}
        renderItem={({ item }) => {
          return <Slide data={item} />;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  export default BannerCarousel