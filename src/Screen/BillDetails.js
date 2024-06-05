import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, View, Pressable, Text, FlatList, TextInput, Button, StatusBar, ScrollView, Alert } from "react-native"; // Import FlatList
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Color, FontSize } from "../../GlobalStyles";
import { FlatlistItemsComponent, BillStatusComponent, AddressViewComponent } from "../component";
import { SafeAreaView } from 'react-native-safe-area-context'

const BillDetails = ({ }) => {
    const navigation = useNavigation();
    const route = useRoute(); // Use useRoute to get the route object
    const { item } = route.params; // Extract item from route.params

    console.log("item", item);
    console.log(item.note);
    const cart = item.Cart;
    const cartItems = Object.values(cart);
    console.log("Cart Items:", cartItems);

    const [status, setStatus] = useState("doing");
    const [note, setNote] = useState(item.note || "Ghi chú"); // Initialize note state with item.note or "Ghi chú"
    useEffect(() => {
        if (item.status === "done") {
            setStatus("Đã hoàn thành");

        } else if (item.status === "fail") {
            setStatus("Đã hủy");
        } else {
            setStatus("Đang xử lý");
        }

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.chiTietDathangInner]}>
                <Text style={styles.chiTietDatHangText}>Thông tin đơn hàng</Text>

                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backIconBtn}
                        contentFit="cover"
                        source={require("../../assets/arrow-left.png")}
                    />
                </Pressable>
            </View>

            <View style={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
            }}>
                {/* Flatlist */}
                <View>
                    <FlatList
                        data={cartItems}
                        renderItem={({ item }) => <FlatlistItemsComponent isDetail={true} item={item} />}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatListContainer}
                        ListHeaderComponent={
                            <>
                                {/* BillStatusComponent */}
                                <BillStatusComponent id={item.id} status={item.status} price={item.total} />

                                {/* AddressViewComponent */}
                                <AddressViewComponent name={item.name} phone={item.phone} address={item.address} />

                            </>
                        }
                        ListFooterComponent={
                            <>
                                <View style={styles.priceContainer}>
                                    <View style={styles.priceLeft}>
                                        <Text style={styles.priceText}>Tiền hàng:</Text>
                                        <Text style={styles.priceText}>Mã giảm giá:</Text>
                                        <Text style={styles.priceText}>Tổng tiền:</Text>
                                    </View>
                                    <View style={styles.priceRight}>
                                        <Text style={styles.priceText}>{item.total + item.discount}đ</Text>
                                        <Text style={styles.priceText}>{item.discount}đ</Text>
                                        <Text style={styles.priceText}>{item.total}đ</Text>
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Color.colorBlack,
                                        backgroundColor: "white",
                                        borderRadius: 5,
                                        marginTop: 10,
                                        paddingHorizontal: 10,
                                        height: "auto",
                                        minHeight: 100,

                                    }}
                                    placeholder="Ghi chú"
                                    value={note}
                                    onChangeText={(text) => setNote(text)} >
                                    {note}

                                </Text>
                            </>

                        } />
                </View>
            </View>





        </SafeAreaView>
    )
}

export default BillDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorWhite,
        backgroundColor: Color.colorPink,

    },

    chiTietDathangInner: {

        height: 48,
        width: "100%",
        backgroundColor: Color.colorPink,
    },
    chiTietDatHangText: {
        left: "15%",
        fontSize: 24,
        textAlign: "left",
        // fontFamily: FontFamily.interRegular,
        color: Color.colorBlack,
        top: 7,
    },
    backIconBtn: {
        width: 24,
        height: 24,
        bottom: "90%",
        left: "5%",
    },
    flatListContainer: {
        flexGrow: 1,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
        backgroundColor: "white",
    },
    priceContainer: {
        marginTop: "2%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        shadowColor: Color.colorBlack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    priceLeft: {
        flexDirection: 'column',
    },
    priceRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: FontSize.size_base,
        // fontFamily: FontFamily.interRegular,
        marginBottom: 5,
        color: Color.colorBlack,
    },
})