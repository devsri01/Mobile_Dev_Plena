import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,Image,
  } from 'react-native';
  import { Button, Card, ListItem } from 'react-native-elements';
  import {
    Header,
  } from 'react-native/Libraries/NewAppScreen';
  import Topbar from '../../components/Topbar';
  import Carousel from '../../components/BannerCarousel';
  import RecommendationCardCall from '../../api/RecommendationCardCall'


import { useNavigation } from '@react-navigation/native';

  const HomeTab = () =>{
    const navigation = useNavigation();
    return (
        <SafeAreaView >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <Topbar navigation={navigation} />
            <Carousel/>
            <Text style={{marginLeft:10,color:'black',fontSize:25}}>Recommended</Text>
          <RecommendationCardCall navigation={navigation}/>
          </ScrollView>
        </SafeAreaView>
      );
  }

  export default HomeTab