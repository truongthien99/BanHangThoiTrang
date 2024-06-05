import React, {
  Component,
  useEffect,
  useState
} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';

import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeSectionComponent from '../Components/HomeSectionComponents';
// import { firebaseConfig, app, analytics } from '../Components/FirebaseConfig';


import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Icon from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
import { dataDemo } from '../mockdata/fakeData';

import { getDatabase, ref, child, get } from 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { AddProduct, BillDetails, BillScreen, Detail, Loading, Login, OrderDetails, Register, SearchScreen, ShoppingCart } from '.'

import CartScreen from './CartScreen';

import { getData, getDataSP, listAllSP, listAllSPLogin } from './Login';
import { AppProvider } from '../contexts/AppProvider';

const Tab = createBottomTabNavigator();
const ProductItem = ({ image, name, price }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: image }} style={styles.itemImage} />
    <Text style={styles.itemName}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>
  </View>
);
//let list;
let user;

export function Home({ navigation, route }) {
  navigation = useNavigation();
  const gobackLogin = () => {
    navigation.goBack();
  }
  user = route.params.user;
  //list = route.params.data;
  //console.log('b123', list);



  //setListSP1(route.params.user);
  useEffect(() => {
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#157cdb',
        inactiveTintColor: '#262626',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            // <Icon name="home" size={26} color={color} />
            <Image source={{
              uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
          }} style={{width:26,height:26}}></Image>
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCart}

        options={{
          headerShown: false,
          tabBarLabel: 'Giỏ Hàng',
          tabBarIcon: ({ color }) => (
            <Image source={{
              uri: "https://cdn.iconscout.com/icon/free/png-256/free-cart-grocery-store-shopping-shop-30488.png",
          }} style={{width:26,height:26}}></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Bill"
        component={BillScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Hóa Đơn',
          tabBarIcon: ({ color }) => (
            <Image source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXRyTgimFrXCp_N6oAuvdf_9gcNu0_BrHaA&s",
          }} style={{width:26,height:26}}></Image>
          ),
        }}
      />
      {/* <Tab.Screen
        name="About Us"
        component={AboutScreen}
        options={{
          tabBarLabel: 'Liên Hệ',
          tabBarIcon: ({ color }) => (
            <Icon name="wechat" size={26} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>

  )
}
const HomeScreen = (navigation) => {

  const [textSearch, onChangeTextSearch] = React.useState('');
  const [listSP, setListSP] = useState([]);
  const [listSP1, setListSP1] = useState([]);
  navigation = useNavigation();
  const [actions, setAction] = useState(0);
  const dbRef = ref(getDatabase());
  const getData = () => {
    get(child(dbRef, `product/`)).then((snapshot) => {
      if (snapshot.exists()) {
        let a = Object.values(snapshot.val());
        setListSP(a);
        //console.log('data1', a);
      } else {
        console.log("No data available");
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }
  

  useEffect(() => {
    if (listSP1 === null) {
      setListSP1(listSP);
    }
    const interval = setInterval(() => {
      getData()
      //console.log('getData');
    }, 500); // Refresh every 5 seconds
    return () => clearInterval(interval);
    
  }, []);

  const OnchangeCategory = id => {
    if (id === 0) {
      setAction(0);
      setListSP1(listSP);
      console.log("sp login 000", listSP);
    }
    if (id === 1) {
      setAction(1);
      setListSP1(listSP.filter((itemloai) => itemloai.typePr == "Áo"));
      console.log("sp login 111", listSP);
    }
    if (id === 2) {
      setAction(2);
      setListSP1(listSP.filter((itemloai) => itemloai.typePr == "Quần"));

    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.userContainer}>
        <Text style={styles.userText}>Xin chào : {user}</Text>
        <TouchableOpacity
          onPress={() => { navigation.goBack(); }
          }
        >
          <Text style={styles.textContainer}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputText}
            autoCapitalize="none"
            onChangeText={onChangeTextSearch}
            value={textSearch}
            placeholder='Bạn cần tìm gì ???'>
          </TextInput>
        </View>
        {/*  */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchScreen', {
              searchName: textSearch,
              dataList: listSP,
            });
          }}
        >
          <View style={styles.cartContainer}>
            <Icon name="search" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View >
        <View style={{ borderBottomWidth: 2, borderColor: '#F9E3EB', }}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaV8d6C8WKQf4Bhgc10SANWzI4V3hgttwjQ0kLGQKcw&s' }}
            style={{ width: -1, height: 220 }} />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          <View style={styles.sectionContainer}>
            <ScrollView horizontal={true}>
              <View style={styles.filterContainer}>
                {dataDemo.map((i, index) => (
                  <TouchableOpacity
                    key={index}
                    style={
                      actions === i?.id
                        ? styles.filterActiveButtonContainer
                        : styles.filterInactiveButtonContainer
                    }
                    onPress={() => {
                      OnchangeCategory(i?.id);
                    }}
                  >
                    <Text
                      style={
                        actions === i?.id
                          ? styles.filterActiveText
                          : styles.filterInactiveText
                      }
                    >
                      {i?.iconName}
                    </Text>
                  </TouchableOpacity>
                )
                )}
              </View>
            </ScrollView>
            <ScrollView horizontal={true}
            >
              <View style={styles.listItemContainer}>
                {listSP1.map((e, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Detail', {
                        maSP: e.idPr,
                        userName: user,
                      });
                      console.log('chuyen man hinh', e.imagePr[0]);
                    }}
                  >
                    <View key={index.toString()}>
                      <ProductItem
                        name={e.namePr}
                        image={e.imagePr[0]}
                        price={e.pricePr}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );


};
const styles = StyleSheet.create({

  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  textContainer: {
    marginLeft: 10,
    fontSize: 15,
    fontStyle: 'italic',
    color: 'red',
  },
  userText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FCB4C7",

  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,

  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
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
  sectionImage: {
    width: 90,
    height: 120,
    borderRadius: 4,
  },
  //
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 6,
    borderBottomWidth: 3,
    borderColor: '#F9E3EB',
    fontStyle: 'bold',
    marginRight: 18,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 6,
    borderBottomWidth: 3,
    borderColor: '#DBDBDB',
    marginRight: 18,

  },
  filterActiveText: {
    color: '#FCB4C7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterInactiveText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  //
  listItemContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#FCB4C7',
    borderRadius: 8,
  },
  itemImage: {
    marginTop: 12,
    width: 140,
    height: 220,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#FDF6F7',
    marginVertical: 4,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FDF6F7',
    marginBottom: 10,
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
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


export default HomeScreen;