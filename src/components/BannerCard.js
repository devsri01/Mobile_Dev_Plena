import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import {Text,View,Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F9B023',
      alignItems: 'center',
      display:'flex',
      flexDirection:'row',
      borderRadius:10,
      margin:10,
      padding:5
    },
    image: {
        position: 'absolute',
      width: '50%',
      height: '100%',
      margin:5,
      borderRadius:10,
    },
    texts:{
        marginLeft:140,
        padding:10,
        color:'white',
    }

})

const BannerCard = ({imageUrl}) =>{
    return (
        
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
            />
            <View style={styles.texts}>
                <Text style={{color:'white'}}>Get</Text>
                <Text style={{color:'white'}}>50% off</Text>
                <Text style={{color:'white'}}>on First 3 orders</Text>
            </View>
        </View>
    )
}

export default BannerCard