import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, View, Pressable, Text, FlatList, TextInput, Button, StatusBar, ScrollView, Alert } from "react-native"; // Import FlatList
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FlatlistItemsComponent } from "../component";
import { CartManager, Cart, Discount, DiscountManager } from "../models"; // Import lớp quản lý sản phẩm
import { deleteOneCartData, createOneBill, deleteOneDiscountData } from "../apis/firebaseComponent";
import { AppContext, email } from '../contexts/AppProvider';





const OrderDetails = ({ route }) => {
  const navigation = useNavigation();

  //dữ liệu tĩnh
  const cart = useContext(AppContext).cartData;
  const qlDiscount = useContext(AppContext).discountData;
  ////dữ liệu giảm giá tĩnh
  qlDiscount.getAllDiscount();
  const [arrList, setArrList] = useState([]);


  let totalPrice = cart.getTotalValue();


  //lấy dữ liệu từ trang trước đó
  // const { productList } = route.params;
  // cart.arrPro = productList;
  totalPrice = cart.getTotalValue();




  //mã giảm giá
  const [discountCode, setDiscountCode] = React.useState("");
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [discountId, setDiscountId] = React.useState("");


  //thông tin địa chỉ
  const [nameCus, setNameCus] = React.useState("");
  const [addressCus, setAddressCus] = React.useState("");
  const [phoneCus, setPhoneCus] = React.useState("");
  const [note, setNote] = React.useState("");

  const [isPaymentOnDelivery, setIsPaymentOnDelivery] = React.useState(false);



  // const DeleteDatas = () => {
  //   deleteDatas();
  // }



  //hàm xử lý khi ấn vào áp dụng mã giảm giá
  const applyDiscount = () => {
    if (!discountCode) {
      console.log("Vui lòng nhập mã giảm giá.");
      return;
    }
    const discountDT = qlDiscount.arrDiscount.find(discount => discount.code === discountCode);

    // Check if discountDT is undefined
    if (!discountDT) {
      console.log("Mã giảm giá không hợp lệ");
      totalPrice = cart.getTotalValue();
      setDiscountAmount(0);
      return;
    }

    const discount = new Discount(discountDT.id, discountDT.code, discountDT.percentage, discountDT.status);

    if (discount && discount.status === "active") {
      totalPrice = cart.getTotalValue();
      setDiscountId(discount.id);
      const percentage = discount.percentage;
      console.log("pet", discount.percentage)
      const discountValue = totalPrice * percentage / 100;
      setDiscountAmount(discountValue);
      totalPrice -= discountValue; // Trừ số tiền giảm giá khỏi tổng tiền
      console.log("Giảm giá:", discountValue);
      console.log("Tổng tiền sau giảm giá:", totalPrice);
    } else {
      console.log("Mã giảm giá không hợp lệ");
      totalPrice = cart.getTotalValue();
      setDiscountAmount(0);

    }
  };

  //Hàm kiểm tra và xuất thông tin khi ấn nút đặt hàng
  const checkPaymentInfo = () => {
    if (!nameCus || !addressCus || !phoneCus) {
      console.log("Vui lòng nhập đầy đủ thông tin địa chỉ thanh toán.");
      return;
    }

    if (!isPaymentOnDelivery) {
      console.log("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    // Tính toán và hiển thị thông tin thanh toán thành công
    const paymentAmount = totalPrice - discountAmount;
    Alert.alert('Đặt hàng thành công!', 'Đơn hàng sẽ sớm được giao')
    // console.log("Thanh toán thành công!");
    // console.log("Thông tin thanh toán:");
    // console.log("Họ và tên:", nameCus);
    // console.log("Địa chỉ:", addressCus);
    // console.log("Số điện thoại:", phoneCus);
    // console.log("Phương thức thanh toán:", isPaymentOnDelivery);
    // console.log("Số tiền phải thanh toán:", paymentAmount, "đ");
    // Alert.alert('Đặt hàng thành công!', 'Đơn hàng trị giá ' + { paymentAmount } + ' của anh/chị ' + { nameCus } + ' sẽ sớm được vận chuyển')
    // const alertt = 'Đơn hàng trị giá ' + { paymentAmount } + ' của anh/chị ' + { nameCus } + ' sẽ sớm được vận chuyển';
    // Alert.alert('Đặt hàng thành công!', alertt)
    const date = new Date();
    console.log("date", date.getTime());
    // const dateorder = new Intl.DateTimeFormat('vn-GB').format(date);
    // console.log("dateorder", dateorder);
    createOneBill({
      username: email(),
      name: nameCus,
      cart: cart.arrPro,
      total: totalPrice - discountAmount,
      discount: discountAmount,
      status: "doing",
      address: addressCus,
      phone: phoneCus,
      note: note,
      date: date.getTime(),
    })
    cart.arrPro.forEach((item) => {
      deleteOneCartData(item.id);
      console.log(item.id)
    });

    if (discountId !== "") {
      deleteOneDiscountData(discountId);

    }

    navigation.goBack();



  };

  useEffect(() => {

    const interval = setInterval(() => {
      // cart.getAllData();
      setArrList(cart.arrPro);

    }, 100); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [cart]);

  return (
    <View style={styles.container}>
      {/* Title của trang */}
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
      {/* Text sản phẩm */}
      <View style={styles.titleSanPhamInner}>
        <Text style={styles.textTitleSanPham}>Sản Phẩm</Text>
      </View>


      {/* flatlist danh sách sản phẩm sau khi ấn mua ngay từ Shopping cart */}
      <View style={styles.flatcontainer}>
        <FlatList
          data={arrList}
          renderItem={({ item }) => <FlatlistItemsComponent isDetail={true} item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          ListFooterComponent={<><View style={styles.discountContainer}>
            <View style={styles.discountInfo}>
              <Text style={styles.discountLabel}>Mã giảm giá</Text>
              <TextInput
                style={styles.discountInput}
                value={discountCode}
                placeholder="Nhập mã giảm giá"
                onChangeText={(text) => setDiscountCode(text)} />
              <Text style={styles.discountDetail}>Giảm giá: {discountAmount}đ</Text>
            </View>
            <View style={styles.discountButtonContainer}>
              <Button
                title="Áp dụng"

                color={"#d54444"}
                onPress={applyDiscount} />
            </View>
          </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceLeft}>
                <Text style={styles.priceText}>Tiền hàng:</Text>
                <Text style={styles.priceText}>Mã giảm giá:</Text>
                <Text style={styles.priceText}>Tổng tiền:</Text>
              </View>
              <View style={styles.priceRight}>
                <Text style={styles.priceText}>{totalPrice}đ</Text>
                <Text style={styles.priceText}>{discountAmount}đ</Text>
                <Text style={styles.priceText}>{totalPrice - discountAmount}đ</Text>
              </View>
            </View>
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentTitle}>1. Địa chỉ thanh toán</Text>
              <TextInput
                style={styles.paymentInput}
                placeholder="Họ và tên"
                value={nameCus}
                onChangeText={(text) => setNameCus(text)} />
              <TextInput
                style={styles.paymentInput}
                placeholder="Địa chỉ"
                value={addressCus}
                onChangeText={(text) => setAddressCus(text)} />
              <TextInput
                style={styles.paymentInput}
                placeholder="Số điện thoại"
                keyboardType="numeric"
                value={phoneCus}
                onChangeText={(text) => setPhoneCus(text)} />

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  backgroundColor: "white",
                  borderRadius: 5,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  height: "auto",
                  minHeight: 100,
                }}
                placeholder="Ghi chú"
                value={note}
                onChangeText={(text) => setNote(text)} />

            </View>


            <View style={styles.paymentMethodContainer}>
              <View style={styles.paymentMethodInner}>
                <Text style={styles.paymentTitle}>2. Phương thức thanh toán</Text>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>Thanh toán sau khi nhận hàng</Text>
                  <BouncyCheckbox
                    value={isPaymentOnDelivery}
                    onPress={(isChecked) => setIsPaymentOnDelivery(isChecked)}
                    style={styles.checkbox}
                    disableText={true}
                    isChecked={false}
                    fillColor="green"
                    unFillColor="#eac1c9"
                    iconStyle={{ borderColor: "green" }}
                    innerIconStyle={{ borderWidth: 2 }} />

                </View>
              </View>
            </View></>}
        />
      </View>
      {/* View của mã giảm giá */}




      <View style={styles.btnDatHangContainer}>
        <Button
          title="Đặt Hàng"
          color={"#5cc761"}
          style={styles.datHangbtn}
          onPress={checkPaymentInfo}
        >
          {/* <Text style={styles.datHangText}>Đặt Hàng</Text> */}
        </Button>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
    overflow: "hidden",
    backgroundColor: 'white',
    // marginTop: StatusBar.currentHeight || 0,

  },
  scrollContainer: {
    flex: 1,
    marginBottom: 40, // Để tránh che phủ nội dung bởi nút "Mua ngay"

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
  titleSanPhamInner: {
    width: "100%",
    alignItems: "center",
    height: 40,

  },
  textTitleSanPham: {
    width: "100%",
    height: 60,
    textAlign: "left",
    fontSize: 23,
    left: "5%", // Để canh text bên trái
    top: "10%", // Để canh text ở giữa theo hàng dọc
  },

  flatListContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },

  flatcontainer: {
    // height: "80%",
  },
  itemContainer: {
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  itemInfo: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    fontSize: 16,
    // fontFamily: FontFamily.interRegular,
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 12,
    // fontFamily: FontFamily.interRegular,
    color: "#959595",
  },

  itemGia: {
    fontSize: 15,
    // fontFamily: FontFamily.interRegular,
    color: "red",
  },

  itemImage: {
    width: 150,
    height: "95%",
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 100,
  },

  discountContainer: {
    bottom: "auto",
    backgroundColor: "#eac1c9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  discountInfo: {
    flex: 1,
    justifyContent: "center",
  },
  discountLabel: {
    fontSize: 16,
    // fontFamily: FontFamily.interRegular,
    marginBottom: 5,
    color: "#000",
  },
  discountInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  discountDetail: {
    fontSize: 12,
    // fontFamily: FontFamily.interRegular,
    color: "#000",
  },
  discountButtonContainer: {
    marginLeft: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },

  priceContainer: {
    marginTop: "2%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#eac1c9",
    borderRadius: 10,
    shadowColor: "#000",
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
    fontSize: 16,
    // fontFamily: FontFamily.interRegular,
    marginBottom: 5,
    color: "#000",
  },

  paymentContainer: {
    marginTop: "2%",
    backgroundColor: "#eac1c9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  paymentMethodContainer: {
    marginTop: "2%",
    marginBottom: "45%",
    backgroundColor: "#eac1c9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  paymentMethodInner: {
    flexDirection: 'column',
  },
  paymentTitle: {
    fontSize: 16,
    // fontFamily: FontFamily.interRegular,
    marginBottom: 10,
    color: "#000",
  },
  paymentInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'flex-end', // Căn chỉnh checkbox sang bên phải
    marginLeft: 8, // Điều chỉnh khoảng cách giữa checkbox và văn bản

  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    // fontFamily: FontFamily.interRegular,
    color: "#000",
  },

  btnDatHangContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: "#5cc761",
    height: 40,
    justifyContent: 'center',

  },
  datHangbtn: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  datHangText: {
    textAlign: "center",
    color: 'white',
    fontSize: 16,
    // fontFamily: FontFamily.interBold,
  },


});

export default OrderDetails;
