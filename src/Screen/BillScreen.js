import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, View, Pressable, Text, FlatList, TextInput, Button, StatusBar, ScrollView, Alert } from "react-native"; // Import FlatList
import { FlatlistItemsComponent } from "../component";
import { AppContext } from '../contexts/AppProvider';





const BillScreen = () => {
    const bill = useContext(AppContext).billData;
    // console.log("billl", bill.arrBill)
    const [arrList, setArrList] = useState([]);

    useEffect(() => {

        const interval = setInterval(() => {
            // cart.getAllData();
            setArrList(bill.arrBill);

        }, 100); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, [bill]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleLSMH}>
                <Text style={styles.textTitle}>Lịch sử mua hàng</Text>
            </View>
            <FlatList
                data={arrList}
                renderItem={({ item }) => <FlatlistItemsComponent isBill={true} item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContainer} />
        </SafeAreaView>
    )
}

export default BillScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
    },

    titleLSMH: {
        width: "100%",
        height: 50,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 20,
        color: "white",

    },
    flatListContainer: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: "white",
        height: "auto",

    },
})