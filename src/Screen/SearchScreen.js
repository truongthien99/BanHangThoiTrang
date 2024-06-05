import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, FlatList, Text, Button, ScrollView, TouchableOpacity, Image, } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import HomeSectionComponent from 'HomeSectionComponent';


const SearchItem = ({ image, name, price }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: image }} style={styles.itemImage} />
    <Text style={styles.itemName}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price} đ</Text>
  </View>
);
let a;
const SearchScreen = ({ navigation, route }) => {
  navigation = useNavigation();
  const [listSPSearch, setList] = useState([]);
  //setList(route.params.dataList);
  const searchName = route.params.searchName;
  a = route.params.dataList;
  console.log('ada', a);
  a.filter((itemloai) => itemloai.namePr === searchName);
  console.log('task', a);
  //setList()
  useEffect(() => {
    const interval = setInterval(() => {
    //console.log('listSearch1', a);
    setList(a);
    listSPSearch.filter((itemloai) => itemloai.namePr === searchName);
    console.log('listSearch', listSPSearch);
    }, 500); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.bodyContainer}>
      {/* <FlatList
                scrollEnabled = {false}
                data={a}
                numColumns={2}
                //columnWrapperStyle={}
                renderItem={({item}) =>{
                        <View>
                        <Text>
                        fdsfsfsd
                        </Text>
                        </View>
                }} 
                keyExtractor={(item, index) => item.maSP} 
                /> */}
      <ScrollView horizontal={false}
      >
        <View style={styles.listItemContainer}>
          {listSPSearch.map((e, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChiTietScreen', {
                  maSP: e.maSP,
                  tenSP: e.tenSP,
                });
                console.log('chuyen man hinh', e.maSP);
              }}
            >
              <View key={index.toString()}>
                <SearchItem
                  name={e.tenSP}
                  image={e.imagePr[0]}
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
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    flexDirection: 'col',
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
})
export default SearchScreen;