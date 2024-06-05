import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { AddProduct, BillDetails, BillScreen, Detail, HomeScreen, Loading, Login, OrderDetails, Register, SearchScreen, ShoppingCart } from './src/Screen'
import { AppProvider } from "./src/contexts/AppProvider";


import { Header, createStackNavigator } from '@react-navigation/stack';

import { Home } from './src/Screen/HomeScreen';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Login" component={Login} options={{ headerShown: false, }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false, }} />
          
          <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false, }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name='AddProduct' component={AddProduct} options={{ headerShown: false, }}></Stack.Screen>
          <Stack.Screen name='Register' component={Register}></Stack.Screen>
          <Stack.Screen name="Loading" component={Loading} />


          <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false, }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false, }} />
          <Stack.Screen name="BillScreen" component={BillScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="BillDetails" component={BillDetails} options={{ headerShown: false, }} />

        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );

}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomTab: {

    marginTop: 500,

    top: "50%",
  },
  container: {
    flex: 1,

  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#F2F2F2',
    borderWidth: 2,
    borderColor: '#FCB4C7',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  sectionImage: {
    width: -24,
    height: 140,
    borderRadius: 4,
  },
});
