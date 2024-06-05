import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from "expo-image";


const AddressViewComponent = ({ name, phone, address }) => {
    return (
        <View style={{
            width: "100%",
            height: 150,
            justifyContent: "center",
            marginBottom: "5%",
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "black",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
        }}>
            <View style={{
                flexDirection: "row",
                marginLeft: "5%",
            }}>
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require("../../assets/Pin_alt.png")} />
                <Text style={{
                    fontSize: 20,
                    color: "black",
                    marginLeft: "2%",
                    marginBottom: "2%",
                    fontWeight: "bold",
                }}>

                    Địa chỉ nhận hàng
                </Text>
            </View>

            <Text style={{
                fontSize: 15,
                color: "gray",
                marginLeft: "5%",
                marginBottom: "2%",
            }}>
                Họ tên: {name}
            </Text>
            <Text style={{
                fontSize: 15,
                color: "gray",
                marginLeft: "5%",
                marginBottom: "2%",
            }}>
                SDT: {phone}
            </Text>
            <Text style={{
                fontSize: 15,
                color: "gray",
                marginLeft: "5%",
                marginBottom: "2%",
            }}>
                Địa chỉ: {address}
            </Text>

        </View>
    )
}

export default AddressViewComponent

const styles = StyleSheet.create({})