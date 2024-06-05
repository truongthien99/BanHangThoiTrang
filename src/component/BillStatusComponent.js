import { StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../contexts/AppProvider';
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Image } from "expo-image";




const BillStatusComponent = ({ id, status, price, date }) => {
    const statusDoing = "doing";
    const statusFail = "fail";
    const statusDone = "done";

    const dateorder = new Intl.DateTimeFormat('vn-GB').format(date);
    // console.log("dateorder", dateorder);

    if (status === statusDoing) {
        return (
            <View style={{
                width: "100%",
                height: 120,
                flexDirection: "row",
                backgroundColor: "#EBED84",
                borderRadius: 10,
                marginBottom: "2%",
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
                    justifyContent: "center",
                    width: "85%",
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Đơn hàng: {id}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Trạng thái: Đang xử lý
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Ngày đặt hàng: {dateorder}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Tổng tiền: {price}
                    </Text>

                </View>

                <Image style={{
                    width: "15%",
                    height: 40,
                    width: 40,
                    alignSelf: "center",
                }} source={require("../../assets/billdoing.png")} />

            </View>
        )
    } else if (status === statusFail) {
        return (
            <View style={{
                width: "100%",
                height: 120,
                flexDirection: "row",
                backgroundColor: "#EE727C",
                borderRadius: 10,
                marginBottom: "2%",
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
                    justifyContent: "center",
                    width: "85%",
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Đơn hàng: {id}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Trạng thái: Đã hủy
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Ngày đặt hàng: {dateorder}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Tổng tiền: {price}
                    </Text>
                </View>

                <Image style={{
                    width: "15%",
                    height: 40,
                    width: 40,
                    alignSelf: "center",
                }} source={require("../../assets/billfail.png")} />

            </View>
        )
    } else {
        return (
            <View style={{
                width: "100%",
                height: 120,
                flexDirection: "row",
                backgroundColor: "#84ED89",
                borderRadius: 10,
                marginBottom: "2%",
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
                    justifyContent: "center",
                    width: "85%",
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Đơn hàng: {id}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Trạng thái: Đã hoàn thành
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Ngày đặt hàng: {dateorder}
                    </Text>
                    <Text style={{
                        fontSize: 15,
                        color: "black",
                        marginLeft: "5%",
                        marginBottom: "2%",
                    }}>
                        Tổng tiền: {price}
                    </Text>
                </View>

                <Image style={{
                    width: "15%",
                    height: 40,
                    width: 40,
                    alignSelf: "center",
                }} source={require("../../assets/billdone.png")} />

            </View>
        )
    }





}

export default BillStatusComponent

const styles = StyleSheet.create({})