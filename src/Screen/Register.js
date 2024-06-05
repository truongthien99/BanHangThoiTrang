import * as React from "react";
import { Text, StyleSheet, Pressable, View, TextInput, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../../assets/GlocalStyles";
import { useFonts } from 'expo-font';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/FirebaseConfig";

const customAlert = (title, content, text, style) => {
  Alert.alert(title, content, [
    {
      text: text,
      onPress: () => console.log('ok'),
      style: style,

    },
  ]);
}
const NgK = () => {
  //Khai bao bien
  const navigation = useNavigation();
  const [name, onChangeTextName] = React.useState('');
  const [email, onChangeTextEmail] = React.useState('');
  const [password, onChangeTextPass] = React.useState('');
  const [repass, onChangeTextrePass] = React.useState('');
  { console.log('name', name) }

  //Hàm thềm đăng ký
  const create = async () => {
    if (password != repass) {
      customAlert('Thông báo', 'Mật khẩu không giống nhau.', 'OK', 'cancel')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        customAlert('Thông báo', 'Đăng ký thành công.', 'OK', 'cancel')
        navigation.navigate("Login")
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          customAlert('Thông báo', 'Mật khẩu phải chứa ít nhất 6 ký tự', 'OK', 'cancel')
        } else if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
          customAlert('Thông báo', 'Email đã tồn tại.', 'OK', 'cancel')
        }
        else {
          customAlert('Thông báo', 'Đăng ký không thành công.', 'OK', 'cancel')
        }

        console.log('er', error.message);

      });
  }
  return (
    <View style={styles.ngK}>
      <View style={[styles.bnCTiKhonNgNhWrapper, styles.khonLayout]}>
        <Pressable
          style={styles.bnCContainerPosition}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.bnCTiKhonNgNh, styles.ngK1FlexBox]}>
            Bạn đã có tài khoản ? Đăng nhập ngay
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
          autoCapitalize="none"
          value={password}
          placeholder="Password"
        />
      </View>
      <View style={[styles.marT, styles.groupView, styles.groupLayout]}>
        <TextInput
          secureTextEntry
          backgroundColor={"white"}
          style={styles.input}
          onChangeText={onChangeTextrePass}
          value={repass}
          placeholder="Re-Password"
        />
      </View>
      <Text style={[styles.ngK1, styles.ngK1FlexBox]}>Đăng ký</Text>
      <View style={[styles.clothesParent, styles.quayPosition]}>
        <Text style={[styles.clothes, styles.ngK1FlexBox]}>CLOTHES</Text>
        <Text style={[styles.nhom5, styles.ngK1FlexBox]}>Nhom 5</Text>
      </View>

      <View style={[styles.marT, styles.rectangleParent1, styles.groupLayout]}>
        <TouchableOpacity
          style={[styles.rectanglePressable, styles.groupLayout]}
          onPress={create}>
          <Text style={[styles.ngK2, styles.ngK2Position]}>Đăng ký</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

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
    height: 43,
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
});

export default NgK;