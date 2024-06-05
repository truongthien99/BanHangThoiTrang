import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Button,
    Alert,
    Pressable
} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ArrProducts from './ArrProducts';
import Product from '../models/Product';
import { ref, push, set, onValue, child, get } from "firebase/database";
import { db } from '../Components/FirebaseConfig';
let p = new Product();
let productAdd = new Product();

// let arrP = new ArrProducts();
// arrP.addProducts(p);
// arrP.addProducts(p1);
// arrP.addProducts(p2);

//Dữ liệu size
const DATASIZE = [
    {
        id: '1',
        title: 'S',
    },
    {
        id: '2',
        title: 'M',
    },
    {
        id: '3',
        title: 'L',
    },
    {
        id: '4',
        title: 'XL',
    },
];
//Dữ liệu size
const ItemSize = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.size, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
);
const customAlert = (title, content, text, style) => {
    Alert.alert(title, content, [
        {
            text: text,
            onPress: () => console.log('ok'),
            style: style,
            backgroundColor: 'red',
        },
    ]);
}
const DATACOLOR = [
    {
        id: 1,
        mau: p.color1,
        url: p.url1,
    },
    {
        id: 2,
        mau: p.colo2,
        url: p.url2,
    },
    {
        id: 3,
        mau: p.color3,
        url: p.url3,
    },
];

//khởi tạo biến color
const ItemColor = ({ item, onPress, onPress2, onPress3, backgroundColor, textColor }) => (

    <View>
        <View style={{ alignItems: 'center' }}>

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
            <View style={styles.viewColor}>

                <Text style={[styles.mau, { color: textColor }]}>{item.color1}</Text><View style={{ width: 80 }}></View>
                <Text style={[styles.mau, { color: textColor }]}>{item.color2}</Text><View style={{ width: 80 }}></View>
                <Text style={[styles.mau, { color: textColor }]}>{item.color3}</Text>
            </View>
        </View>

    </View>
);



const AddProduct = ({ route, props }) => {
    //Lấy dữ liệu được truyền qua từ màn hình trước
    let id = route.params.id;
    let username = route.params.username;
    p = route.params.data;
    //console.log('url1', p.imagePr[0]);

    //tạo biến 
    const [isLoading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState([]);
    const [selectedIdSize, setSelectedIdSize] = useState();
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    //Ham doc du lieu tu firebase
    const read = async (id) => {
        const dbRef = ref(db);
        try {
            get(child(dbRef, `product/${id}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let a = [snapshot.val()]
                    setData(a);
                    console.log('F23', a);
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

    //Hàm thềm dữ liệu lên firebase
    const createDataCart = () => {
        const postListRef = ref(db, 'Cart');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            id: newPostRef.key,
            name: p.namePr,
            price: p.pricePr,
            img: selectedId[0].url,
            color: selectedId[0].color,
            size: selectedIdSize,
            username: username,
            quantity: 1,
        }).then(() => {
            customAlert('Thông báo', 'Thêm thành công.', 'OK', 'cancel')
            navigation.navigate("Home", { user: username })
        }).catch((error) => {
            alert(error);
        });
    }
    //Hàm thêm dữ liệu lên sql sever
    // const addProduct = () => {
    //     // tạo đối tượng dữ liệu
    //     let objLHP = { name: p.name, price: p.price, url: selectedId, size: selectedIdSize, description: p.description, username: username };
    //     console.log('cr', objLHP);
    //     //url
    //     let url_api = 'http://192.168.13.187/Product/create.php?';

    //     fetch(url_api, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(objLHP)
    //     })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((ex) => {
    //             console.log(ex);
    //         });

    // }

    //Hàm đọc dữ liệu từ api
    // const getData = async (id) => {
    //     try {
    //         const response = await fetch('http://192.168.13.187/Product/readProductByID.php?id=' + id);
    //         const json = await response.json();
    //         setData(json);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    //select color 
    const renderItem = ({ item }) => {
        return (
            <ItemColor
                item={item}
                onPress={() => setSelectedId([{ url: item.imagePr[0], color: item.colorPr[0] }])}
                onPress2={() => setSelectedId([{ url: item.imagePr[1], color: item.colorPr[1] }])}
                onPress3={() => setSelectedId([{ url: item.imagePr[2], color: item.colorPr[2]}])}

            />
        );
    };

    //select size
    const renderItemSize = ({ item }) => {
        const backgroundColor = item.title === selectedIdSize ? '#523A3F' : '#fff';
        const color = item.title === selectedIdSize ? 'black' : 'black';

        return (
            <ItemSize
                item={item}
                onPress={() => setSelectedIdSize(item.title)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    useEffect(() => {
        // cập nhật giao diện ở đây
        read(id);
    }, []);

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: '#EAC1C9',
            }}>
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
            <View style={{}}>
                {console.log('logne2', selectedId)}
                <Text style={[styles.title, { marginTop: 70 }]}>Chọn màu</Text>
                <FlatList
                    style={{ alignSelf: 'center' }}
                    horizontal
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />

                <View style={{ marginTop: 40, }}>
                    <Text style={styles.title}>Chọn size</Text>
                    <FlatList
                        style={{ alignSelf: 'center' }}
                        horizontal
                        data={DATASIZE}
                        renderItem={renderItemSize}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    /></View>

                <View style={{ marginLeft: 30, marginTop: 20 }}>
                    <Text style={styles.name}>Tên: {p.namePr}</Text>

                    <Text
                        style={{
                            marginTop: 5,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>
                        Giá: {p.pricePr}
                    </Text>

                    <Text
                        style={{
                            marginTop: 5,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>
                        Mô tả: {p.descriptionPr}
                    </Text>
                </View>
            </View>
            <View style={styles.submit}>
                <Button title="Thêm vào giỏ hàng" color="#543B3E" onPress={createDataCart} />
            </View>
        </View>
    );
};

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
        fontSize: 12,
    },
    tinyLogo: {
        borderRadius: 10,
        width: 90,
        height: 90,
    },
    name: {
        marginTop: 10,
        alignSelf: 'left',
        fontWeight: 'bold',
        fontSize: 16,
    },
    submit: {
        marginTop: 50,
        alignSelf: 'center',
        width: 180,
        height: 40,
        backgroundColor: '#543B3E',
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    size: {
        width: 60,
        padding: 20,
        fontWeight: 'bold',
        fontSize: 15,
        alignContent: 'center'
    },
    mau: {
        alignSelf: 'center',
        marginTop: 7,
        fontWeight: 'bold',
        fontSize: 17,
    },
    viewColor: {
        flexDirection: 'row',
    }
});

export default AddProduct;
