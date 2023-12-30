import * as React from 'react';
import { SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import ImagesTrial from './src/components/CategoryImgCarousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from './src/screens/homepage/HomeTab';
import Cart from './src/screens/ShoppingCart';
import Product from './src/screens/Product';
import CategoryTab from './src/screens/homepage/CategoryTab';

const Stack = createNativeStackNavigator();


function FavouriteScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favourite!</Text>
    </View>
  );
}

function MoreScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>more!</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const label =route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
          {label==="Home"? isFocused ? <View style={{backgroundColor:"black", borderRadius:50 ,padding:7}}><MaterialIcons name="home" size={30} color="#E0B420" /></View>: <MaterialIcons name="home" size={24} color="black"  />:null}
          {label==="Category"? isFocused ? <View style={{backgroundColor:"black", borderRadius:50 ,padding:7}}><MaterialIcons name="category" size={30} color="#E0B420"  /></View>: <MaterialIcons name="category" size={24} color="black"  />:null}
          {label==="Favourite"? isFocused ? <View style={{backgroundColor:"black", borderRadius:50 ,padding:7}}><MaterialIcons name="favorite" size={30} color="#E0B420"  /></View>: <MaterialIcons name="favorite" size={24} color="black"  />: null}
          {label==="More"? isFocused ? <View style={{backgroundColor:"black", borderRadius:50 ,padding:7}}><MaterialIcons name="more" size={30} color="#E0B420"  /></View>:<MaterialIcons name="more" size={24} color="black"  />: null}
          
            <Text>
              {isFocused ? null: label}
              
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();


const Homepage = () =>{
  return (
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false }}/>
        <Tab.Screen name="Category" component={CategoryTab} options={{ headerShown: false }}/>
        <Tab.Screen name="Favourite" component={FavouriteScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="More" component={MoreScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={Product} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}