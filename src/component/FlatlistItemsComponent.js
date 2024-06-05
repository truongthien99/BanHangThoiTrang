import { StyleSheet, View, Pressable, Text, StatusBar, FlatList, ScrollView, Button, Touchable } from "react-native";
import React, { useState, useEffect } from "react";
import { appInfo } from "../constains/appInfo";
// import { FlatList } from 'react-native-gesture-handler';
import { Image } from "expo-image";
import { Color, FontSize, Border, FontFamily } from "../../GlobalStyles";
import { BillStatusComponent, AddressViewComponent } from "./";
import { useNavigation } from "@react-navigation/native";
import { createOneCartData, getAllCartData, updateCartData, deleteOneCartData } from "../apis/firebaseComponent";




const FlatlistItemsComponent = ({ isDetail, item, handleRemoveProduct, isBill, statusBill, isBillDetails }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const navigation = useNavigation();

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            // item.decreasequantity();
            const quantityNew = item.quantity - 1;
            item.quantity = quantityNew;
            updateCartData(item.id, item.username, item.name, item.color, item.price, quantityNew, item.size, item.img);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        // item.increasequantity();
        const quantityNew = item.quantity + 1;
        item.quantity = quantityNew;
        updateCartData(item.id, item.username, item.name, item.color, item.price, quantityNew, item.size, item.img);

    };

    const RemoveProduct = () => {
        handleRemoveProduct(item.id);
        deleteOneCartData(item.id);
    };



    const handlePress = () => {
        console.log(item);
        navigation.navigate("BillDetails", { item: item });
    }






    // OrderDetails functions 
    if (isBill) {
        if (isBillDetails) {
            return (
                <View style={{
                    height: "auto",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    borderRadius: 10,
                    backgroundColor: "white",
                    shadowColor: "black",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 10,
                }}>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <Text style={{
                            fontSize: FontSize.size_base,

                            marginBottom: 5,
                        }}>{item.name}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: Color.colorDarkgray_200,
                        }}>Phân loại: {item.color}, {item.size}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: Color.colorDarkgray_200,
                        }}>Số lượng: {item.quantity}</Text>
                        <Text style={{
                            fontSize: 15,
                            color: "red",
                        }}>Giá: {item.quantity * item.price}đ</Text>
                    </View>
                    <Image style={{
                        width: 150,
                        height: "95%",
                        // borderTopRightRadius: 10,
                        // borderBottomRightRadius: 10,
                        borderRadius: 100,
                    }} source={{ uri: item.img }} />
                </View>
            )
        } else {
            return (
                <Pressable onPress={handlePress}>
                    <BillStatusComponent id={item.id} status={item.status} price={item.total} date={item.date} />
                </Pressable>
            )
        }

    } else {
        if (isDetail) {
            return (

                <View style={{
                    height: "auto",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                    borderRadius: 10,
                    backgroundColor: "white",
                    shadowColor: "black",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 10,
                }}>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <Text style={{
                            fontSize: FontSize.size_base,

                            marginBottom: 5,
                        }}>{item.name}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: Color.colorDarkgray_200,
                        }}>Phân loại: {item.color}, {item.size}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: Color.colorDarkgray_200,
                        }}>Số lượng: {item.quantity}</Text>
                        <Text style={{
                            fontSize: 15,
                            color: "red",
                        }}>Giá: {item.quantity * item.price}đ</Text>
                    </View>
                    <Image style={{
                        width: 150,
                        height: "95%",
                        // borderTopRightRadius: 10,
                        // borderBottomRightRadius: 10,
                        borderRadius: 100,
                    }} source={{ uri: item.img }} />
                </View>

            )
        } else {
            return (

                <View style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: Color.colorGainsboro,
                    borderRadius: 20,
                    backgroundColor: Color.colorPink,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    marginBottom: 5,
                    shadowColor: Color.colorBlack,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 7,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{ marginRight: 10, }}>
                            <Image style={{
                                height: 86,
                                width: 86,
                                borderRadius: Border.br_11xl,
                            }} source={{ uri: item.img }} />
                        </View>
                        <View style={{ width: "65%" }}>
                            <Text style={{
                                fontSize: FontSize.size_base,
                                color: "black",
                                marginBottom: 4,
                            }}>{item.name}</Text>
                            <Text style={{
                                fontSize: FontSize.size_xs,
                                color: Color.colorDarkgray_200
                            }}>Phân Loại: {item.size}, {item.color}</Text>
                            <Text style={{
                                fontSize: FontSize.size_xs,
                                color: Color.colorDarkgray_200,
                            }}>Giá: {item.quantity * item.price}đ</Text>
                            <View style={{
                                height: 23,
                                width: 70,
                                borderWidth: 1,
                                borderColor: Color.colorDarkgray_200,
                                borderRadius: Border.br_6xs,
                                backgroundColor: Color.colorPink,
                                borderStyle: "solid",
                                flexDirection: 'row',
                                justifyContent: 'space-between', // Thay đổi giá trị của justifyContent
                                alignItems: 'center',
                            }}>
                                <Pressable onPress={decreaseQuantity}>
                                    <Text style={{
                                        fontSize: FontSize.size_smi,
                                        // fontFamily: FontFamily.interMedium,
                                        fontWeight: "500",
                                        color: Color.colorBlack,
                                    }}>    -</Text>
                                </Pressable>
                                <Text style={{
                                    fontSize: FontSize.size_smi,
                                    // fontFamily: FontFamily.interMedium,
                                    fontWeight: "500",
                                    color: Color.colorBlack,
                                }}>{item.quantity}</Text>
                                <Pressable onPress={increaseQuantity}>
                                    <Text style={{
                                        fontSize: FontSize.size_smi,
                                        // fontFamily: FontFamily.interMedium,
                                        fontWeight: "500",
                                        color: Color.colorBlack,
                                    }}>+   </Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                    <Pressable onPress={RemoveProduct}>
                        <Image style={{
                            height: 24,
                            width: 24,
                        }} source={require("../../assets/trash.png")} />
                    </Pressable>

                </View>
            )
        }
    }


}

export default FlatlistItemsComponent;

const styles = StyleSheet.create({})