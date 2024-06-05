import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Pressable, TextInput, Alert, TouchableOpacity } from 'react-native'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, app, analytics, firebaseConfig } from '../Components/FirebaseConfig';
import { getDatabase, ref, child, get } from "firebase/database";
import { Color, FontFamily, FontSize, Border } from "../../assets/GlocalStyles";
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

// Import the functions you need from the SDKs you need
//import { getAllSP } from '../Components/HomeSectionComponents';


const customAlert = (title, content, text, style) => {
  Alert.alert(title, content, [
    {
      text: text,
      onPress: () => console.log('ok'),
      style: style,
    },
  ]);
}

const Login = () => {
  const [email, onChangeTextEmail] = React.useState('');
  const [password, onChangeTextPass] = React.useState('');
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dbRef = ref(getDatabase());
  const getData = () => {
    get(child(dbRef, `product/`)).then((snapshot) => {
      if (snapshot.exists()) {
        let a = Object.values(snapshot.val());
        setData(a);
        console.log('data1', snapshot.val());
      } else {
        console.log("No data available");
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleLogin = () => {
    // get(child(dbRef, `product/`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     let a = Object.values(snapshot.val());
    //     setData(a);
    //     console.log('data1', snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //const { email, password } = this.state
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (email == 'admin@gmail.com' || email == 'admin1@gmail.com' || email == 'admin2@gmail.com') {
          console.log('day la admin');
        } else {
          navigation.navigate('Home', {
            user: email,
            //data: data,
          })
          console.log('data2', data);
        }


      }
      )
      .catch((error) => {
        console.log('handleLogin')
        customAlert('Thông báo', 'Mật khẩu hoặc tài khoản không chính xác', 'OK', 'cancel')
        const errorMessage = error.message;
      });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      handleLogin
      getData
    }, 1000); // Refresh every 5 seconds

    return () => clearInterval(interval);

    
  }, []);
  return (
    <SafeAreaView style={styles.ngK}>
      <View style={[styles.bnCTiKhonNgNhWrapper, styles.khonLayout]}>
        <Pressable
          style={styles.bnCContainerPosition}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.bnCTiKhonNgNh, styles.ngK1FlexBox]}>
            Bạn chưa có tài khoản ? Đăng ký ngay
          </Text>
        </Pressable>
      </View>
      <View style={[styles.marT, styles.rectangleGroup, styles.groupLayout1]}>
        <TextInput
          backgroundColor={"white"}
          style={styles.input}
          onChangeText={onChangeTextEmail}
          value={email}
          placeholder="Email"
          type='email'
        />
      </View>
      <View style={[styles.marT, styles.rectangleContainer, styles.groupLayout]}>
        <TextInput
          secureTextEntry
          backgroundColor={"white"}
          style={styles.input}
          onChangeText={onChangeTextPass}
          value={password}
          placeholder="Password"
        />
      </View>

      <Text style={[styles.ngK1, styles.ngK1FlexBox]}>Đăng Nhập</Text>
      <View style={[styles.clothesParent, styles.quayPosition]}>
        <Text style={[styles.clothes, styles.ngK1FlexBox]}>CLOTHES</Text>
        <Text style={[styles.nhom5, styles.ngK1FlexBox]}>Nhom 5</Text>
      </View>

      <View style={[styles.marT, styles.rectangleParent1, styles.groupLayout]}>
      <TouchableOpacity
          style={[styles.rectanglePressable, styles.groupLayout]}
          onPress={handleLogin}>
          <Text style={[styles.ngK2, styles.ngK2Position]}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  khonLayout: {
    height: 26,
    width: 316,
    marginLeft: -158,
  },
  input: {
    height: 40,
    width: 320,
    padding: 10,
    alignSelf: 'center',
  },
  marT: {
    marginTop: -40,
  },
  ngK1FlexBox: {
    textAlign: "center",
    color: Color.colorDimgray_100,
  },
  groupChildLayout: {
    height: 44,
    width: 316,
    position: "absolute",
  },
  groupPosition: {
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  namePosition: {
    height: 19,
    marginTop: -9.7,
    color: Color.colorGray,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 5,
    textAlign: "center",
    fontSize: FontSize.size_base,
    top: "50%",
    position: "absolute",
  },
  groupLayout1: {
    width: 320,
    height: 44,
    position: "absolute",
  },
  groupLayout: {
    height: 43,
    width: 316,
    position: "absolute",
  },
  ngK2Position: {
    marginTop: -9.5,
    textAlign: "center",
    fontSize: FontSize.size_base,
    top: "50%",
    position: "absolute",
  },
  quayPosition: {
    top: "50%",
    position: "absolute",
  },
  bnCTiKhonNgNh: {
    marginTop: -13,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    color: Color.colorDimgray_100,
    height: 26,
    width: 316,
    marginLeft: -158,
  },
  bnCContainerPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  bnCTiKhonNgNhWrapper: {
    marginTop: 240,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  groupChild: {
    height: 44,
    width: 316,
    position: "absolute",
  },
  email: {
    width: 41,
  },
  rectangleParent: {
    top: 385,
    left: 36,
  },
  groupItem: {
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  name: {
    width: 45,
  },
  rectangleGroup: {
    top: 320,
    left: 36,
  },
  groupInner: {
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  password: {
    color: Color.colorGray,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 5,
    marginTop: -9.5,
  },
  rectangleContainer: {
    top: 385,
    left: 36,
  },
  groupView: {
    top: 450,
    left: 36,
  },
  ngK1: {
    marginTop: -160,
    left: 135,
    fontSize: 28,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    top: "50%",
    position: "absolute",
  },
  clothes: {
    marginTop: 20.5,
    left: 146,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    color: Color.colorDimgray_100,
    top: "50%",
    position: "absolute",
  },
  nhom5: {
    marginTop: -40,
    fontSize: FontSize.size_31xl,
    fontFamily: FontFamily.lemonRegular,
    left: 20,
    top: "50%",
    position: "absolute",
  },
  clothesParent: {
    marginTop: -289,
    left: 69,
    width: 222,
    height: 79,
  },
  rectanglePressable: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorDimgray_100,
    left: 0,
    top: 0,
    height: 100,
  },
  ngK2: {
    left: 126,
    color: Color.colorWhite,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  rectangleParent1: {
    top: 540,
    left: 36,
  },
  quayLi: {
    marginTop: -12,
    fontSize: FontSize.size_xl,
    left: 0,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    top: "50%",
    position: "absolute",
  },
  quayLiWrapper: {
    marginTop: -378,
    left: 16,
    width: 97,
    height: 24,
  },
  ngK: {
    backgroundColor: Color.colorPink,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
export default Login;