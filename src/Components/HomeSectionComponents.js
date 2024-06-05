import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HomeScreen from '../Screen/HomeScreen';
import ChiTietScreen from '../Screen/Detail';

import { dataDemo } from '../src/mockdata/fakeData';
import { firebaseConfig, app, analytics } from './FirebaseConfig';

import { getDatabase, ref, child, get } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getData, getDataSP, listAllSP, listAllSPLogin } from '../Screen/Login';


const item_image_1 = 'https://down-vn.img.susercontent.com/file/vn-11134211-23030-zh1c2ow2ceov15';
const item_image_2 = 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ls2far6oxjgk26';
const item_image_3 = 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li9xvdcl7t1u9d';
const item_image_4 = 'https://down-vn.img.susercontent.com/file/312a3e456dd7e7a7951f37f62c81411e';


const ProductItem = ({image, name, price}) => (
    <View style={styles.itemContainer}>
      <Image source= {{uri: image}} style={styles.itemImage} />
      <Text style={styles.itemName}>
        {name}
      </Text>
      <Text style={styles.itemPrice}>{price}</Text>
    </View>
  );
    
  const  HomeSectionComponent  = ({navigation, route}) =>  {
    let a = route.params.user;
    console.log('a123',a);
  
    const[listSP,setListSP] = useState([]);
    
    navigation = useNavigation();

    const [actions, setAction] = useState(0);
    //lay tu fire base
    
   
    useEffect(() => {
          // cập nhật giao diện ở đây
          getData;
        
  }, []);
    const OnchangeCategory = id => {
        if (id === 0) {
          setAction(0);
          setListSP(listAllSP);
          console.log("sp login 000", listSP);
        }
        if (id === 1) {
          setAction(1);
          setListSP(listAllSP.filter((itemloai) => itemloai.loai == "ao"));
          console.log("sp login 111", listSP);
        }
        if (id === 2) {
          setAction(2);
          setListSP(listAllSP.filter((itemloai) => itemloai.loai == "quan"));
          
        }
    };
    
    return(
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
          {listSP.map((e, index) => (
            <TouchableOpacity
            onPress={() =>{
              navigation.navigate('ChiTietScreen', {
                maSP: e.maSP,
                tenSP: e.tenSP,
              });
              console.log('chuyen man hinh', e.maSP);
            }}
            >
              <View key={index.toString()}>
              <ProductItem
                name={e.tenSP}
                image= {e.url1}
                price={e.gia}
              />
            </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </View>
    );
  };
    <NavigationContainer>
      
    </NavigationContainer>
  const styles = StyleSheet.create({

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
});


export default HomeSectionComponent;