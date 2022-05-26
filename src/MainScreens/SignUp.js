import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppHeader from "../Custom/AppHeaders";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import axios from "axios";
import store from "../../redux/store";
function SignUp(props) {
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const [std_id, setStd_Id] = useState("");
  const [std_name, setStd_Name] = useState("");
  const [password, setPassword] = useState("");
  const [ph_num_one, setPh_Num_One] = useState("");
  const [ph_num_two, setPh_Num_Two] = useState("");
  const [ph_num_three, setPh_Num_Three] = useState("");
  const [room_num, setRoom_Num] = useState("");
  const [e_mail, setE_Mail] = useState("");
  var re = /^[0-9a-zA-Z]*@g\.yju\.ac\.kr/;
  const SignIn = () => {
    if (
      std_id === undefined ||
      std_id.length != 7 ||
      std_name === undefined ||
      password === undefined ||
      ph_num_one === undefined ||
      ph_num_two === undefined ||
      ph_num_three === undefined ||
      ph_num_one.length + ph_num_two.length + ph_num_three.length != 11 ||
      !re.test(e_mail + "@g.yju.ac.kr") ||
      room_num.length < 3 ||
      room_num.length > 4 ||
      room_num === undefined
    ) {
      if (!re.test(e_mail + "@g.yju.ac.kr")) {
        alert("이메일 입력 포맷을 준수해 주세요.( ex) example1@g.yju.ac.kr)");
      } else if (
        ph_num_one.length + ph_num_two.length + ph_num_three.length !=
        11
      ) {
        alert("올바른 핸드폰 번호를 입력해주세요");
      } else if (std_id.length != 7) {
        alert("학번의 길이가 맞지 않습니다.");
      } else if (room_num.length < 3 || room_num.length > 4) {
        alert("실제 호실이 아닙니다.");
      } else {
        alert("어딘가 유효하지 않은 값이 있습니다!");
      }
    } else {
      axios
        .post(store.getState().URL + "/signup", {
          std_id,
          std_name,
          password,
          ph_num: ph_num_one + "-" + ph_num_two + "-" + ph_num_three,
          room_num,
          e_mail: e_mail + "@g.yju.ac.kr",
        })
        .then((res) => {
          props.navigation.goBack();
        })
        .catch((err) => alert("자신의 정보를 입력해주세요."));
    }
  };

  const inputStyle = {
    width: "90%",
    height: "60%",
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "solid",
    elevation: 5,
    padding: "2%",
    margin: 0,
  };
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={"회원가입"}
        isLeft={true}
      ></AppHeader>
      <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              marginBottom: "3%",
            }}
          >
            <Text style={{ marginTop: "3%" }}>이름</Text>
            <TextInput
              style={inputStyle}
              value={std_name}
              onChangeText={(text) => setStd_Name(text)}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              marginBottom: "3%",
            }}
          >
            <Text style={{ marginTop: "3%" }}>학번</Text>
            <TextInput
              style={inputStyle}
              value={std_id}
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, "");
                setStd_Id(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              marginTop: "2%",
            }}
          >
            <Text>이메일</Text>
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  width: "45%",
                  height: "80%",
                  borderWidth: 2,
                  borderRightWidth: 0,
                  borderRightColor: "white",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  elevation: 5,
                  outline: "none",
                  padding: "2%",
                  margin: 0,
                }}
                value={e_mail}
                onChangeText={(text) => {
                  setE_Mail(text);
                }}
              ></TextInput>
              <View
                style={{
                  width: "45%",
                  height: "80%",
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  borderStyle: "solid",
                  elevation: 5,
                  padding: "2%",
                  margin: 0,
                  flexDirection: "row-reverse",
                }}
              >
                <Text>@g.yju.ac.kr</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              marginBottom: "3%",
            }}
          >
            <Text style={{ marginTop: "3%" }}>비밀번호</Text>
            <TextInput
              style={inputStyle}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              marginBottom: "3%",
            }}
          >
            <Text style={{ marginTop: "3%" }}>호실</Text>
            <TextInput
              style={inputStyle}
              value={room_num}
              keyboardType="number-pad"
              onChangeText={(text) => {
                text = text.replace(/[^0-9]/g, "");
                setRoom_Num(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              marginTop: "2%",
            }}
          >
            <Text>전화번호</Text>
            <View
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  width: "28%",
                  height: "80%",
                  borderWidth: 2,
                  borderRadius: 10,
                  borderStyle: "solid",
                  elevation: 5,
                  padding: "2%",
                  margin: 0,
                }}
                value={ph_num_one}
                keyboardType="numeric"
                onChangeText={(text) => {
                  text = text.replace(/[^0-9]/g, "");
                  setPh_Num_One(text);
                  if (text.length === 3) {
                    ref_input2.current.focus();
                  }
                }}
                maxLength={3}
              ></TextInput>
              <View
                style={{
                  width: "3%",
                  height: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>-</Text>
              </View>
              <TextInput
                style={{
                  width: "28%",
                  height: "80%",
                  borderWidth: 2,
                  borderRadius: 10,
                  borderStyle: "solid",
                  elevation: 5,
                  padding: "2%",
                  margin: 0,
                }}
                ref={ref_input2}
                value={ph_num_two}
                keyboardType="numeric"
                onChangeText={(text) => {
                  text = text.replace(/[^0-9]/g, "");
                  setPh_Num_Two(text);
                  if (text.length === 4) {
                    ref_input3.current.focus();
                  }
                }}
                maxLength={4}
              ></TextInput>
              <View
                style={{
                  width: "3%",
                  height: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>-</Text>
              </View>
              <TextInput
                style={{
                  width: "28%",
                  height: "80%",
                  borderWidth: 2,
                  borderRadius: 10,
                  borderStyle: "solid",
                  elevation: 5,
                  padding: "2%",
                  margin: 0,
                }}
                value={ph_num_three}
                ref={ref_input3}
                keyboardType="numeric"
                onChangeText={(text) => {
                  text = text.replace(/[^0-9]/g, "");
                  setPh_Num_Three(text);
                }}
                maxLength={4}
              ></TextInput>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp("10%"),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              SignIn();
            }}
            style={{
              height: "70%",
              width: "90%",
              backgroundColor: "#0064ff",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              회원 가입 신청
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
export default SignUp;
