import React from 'react';  
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import ImagesTrial from '../../components/CategoryImgCarousel';

 CategoryTab = ({navigation}) => {
    React.useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
  
    return (
      <SafeAreaView >
            <ScrollView
              contentInsetAdjustmentBehavior="automatic">
            <ImagesTrial/>
            </ScrollView>
        </SafeAreaView>
    );
  }

  export default CategoryTab