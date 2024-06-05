import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Button,
    ActivityIndicator,
    Pressable
} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import Product from '../models/Product';
import { ref, set, onValue, child, get } from "firebase/database";
import { db } from '../Components/FirebaseConfig';

let p = new Product();

//item chi tiết sản phẩm
const Item = ({ urlSelected, item, onPress, onPress2, onPress3, backgroundColor, textColor }) => (
    <View>
        
        <View style={{ alignItems: 'center' }}>
            <Image
                style={styles.Logo}
                source={{
                    uri: urlSelected,
                }} />
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={onPress}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.imagePr[0],
                        }} />
                </TouchableOpacity>
                <View style={{ width: 20 }}></View>
                <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={onPress2} >
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.imagePr[1],
                        }} />
                </TouchableOpacity>
                <View style={{ width: 20 }}></View>
                <TouchableOpacity style={[styles.item, { backgroundColor }]} onPress={onPress3} >
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: item.imagePr[2],
                        }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text style={[styles.mau, { color: textColor }]}>{item.colorPr[0]}</Text><View style={{ width: 50 }}></View>
                <Text style={[styles.mau, { color: textColor }]}>{item.colorPr[1]}</Text><View style={{ width: 50 }}></View>
                <Text style={[styles.mau, { color: textColor }]}>{item.colorPr[2]}</Text>
            </View>

        </View>
        <View style={styles.viewPD}>
            <Text style={styles.name}>Tên: {item.namePr
            }</Text>
            <Text
                style={styles.price}>
                Giá: {item.pricePr} VND
            </Text>

            <Text
                style={styles.des}>
                Mô tả: {item.
                    descriptionPr
                }
            </Text>
        </View>
    </View>
);


const Detail = ({ props, route, navigation }) => {
    let id = route.params.maSP;
    console.log("idPR", id);
    let username = route.params.userName;
    // let id = 0;
    // let username = 'test';
    // console.log("idSP", id);
    //tạo biến 
    const [isLoading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState();
    const [data, setData] = useState([]);
    navigation = useNavigation();

    //Ham doc du lieu tu firebase
    const read = async (id) => {
        const dbRef = ref(db);
        try {
            get(child(dbRef, `product/${id}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let a = [];
                    a[0] = snapshot.val();
                    setData(a);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }


    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.imagePr[0])}
                onPress2={() => setSelectedId(item.imagePr[1])}
                onPress3={() => setSelectedId(item.imagePr[2])}
                urlSelected={selectedId}
            />
        );
    };

    useEffect(() => {
        // cập nhật giao diện ở đây
        read(id);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#EAC1C9' }}>
            <View style={[styles.chiTietDathangInner]}>
                <Text style={styles.chiTietDatHangText}>Chi tiết đặt hàng</Text>
                {/* {console.log("cart", cart)} */}
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.backIconBtn}
                        contentFit="cover"
                        source={require("../../assets/arrow-left.png")}
                    />
                </Pressable>
            </View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View style={{ marginLeft: 15, }}>
                        <FlatList style={{ alignSelf: 'center' }}
                            horizontal
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            extraData={selectedId} />
                    </View>
                    <View style={styles.submit}>
                        <Button style={styles.submit}
                            borderRadius={12}
                            color={'#543B3E'}
                            title={"Mua ngay"}
                            onPress={() => navigation.navigate("AddProduct", { data: data[0], username: username, id: id })} />
                        <Text></Text>
                    </View>
                </View>
            )}

        </View>

    );
};

//css
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    chiTietDathangInner: {

        height: 48,
        width: "100%",
        backgroundColor: "#eac1c9",
    },
    chiTietDatHangText: {
        left: "15%",
        fontSize: 25,
        textAlign: "left",
        // fontFamily: FontFamily.interRegular,
        color: "#000",
        top: 7,

    },
    backIconBtn: {
        width: 24,
        height: 24,
        bottom: "90%",
        left: "5%",
    },
    item: {
        marginTop: 15,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    mau: {
        alignSelf: 'center',
        marginTop: 7,
        fontWeight: 'bold',
        fontSize: 17,
    },
    tinyLogo: {
        borderRadius: 10,
        width: 60,
        height: 60,
    },
    Logo: {
        marginTop: 20,
        borderRadius: 10,
        alignSelf: 'center',
        width: 350,
        height: 350,
    },
    name: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    submit: {
        marginTop: 20,
        alignSelf: 'center',
        width: 180,
        height: 40,
        backgroundColor: '#543B3E',
        borderRadius: 10,
        borderWidth: 1,
    },
    price: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'left'
    },
    des: {
        height: 70,
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    viewPD: {
        alignSelf: 'left'
    }
});

export default Detail;