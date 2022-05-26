import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import store from "../../redux/store";

function SignIn(props) {
  const [stdNum, setStdNum] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const inputStyle = {
    marginTop: "3%",
    marginBottom: "1%",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "solid",
    width: "80%",
    borderRadius: 10,
    padding: "2%",
  };
  const login = () => {
    axios
      .post(
        store.getState().URL + "/auth/login",
        {
          username: stdNum,
          password,
        },
        { withCredentials: true }
      )
      .then(async (res) => {
        try {
          await AsyncStorage.setItem("user_info", JSON.stringify(res.data));
          const userInfo = await AsyncStorage.getItem("user_info");
          props.setUserInfo(JSON.parse(userInfo));
          props.setIsLogined(true);
        } catch (err) {
          console.log(err);
        }
        props.navigation.reset({ routes: [{ name: "home" }] });
      })
      .catch((err) => {
        alert(err.response.data);
        console.trace(err);
      });
  };
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={"Sign In"}
        isLeft={true}
      ></AppHeader>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={inputStyle}
            placeholder="학번"
            value={stdNum}
            onChangeText={(text) => setStdNum(text)}
          ></TextInput>
          <TextInput
            style={inputStyle}
            placeholder="비밀번호"
            value={password}
            secureTextEntry={passwordHidden}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <View
            style={{
              width: "80%",
              height: "20%",
              margin: "5%",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
                borderRadius: 30,
              }}
              onPress={() => {
                login();
              }}
            >
              <Text
                style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
              >
                로그인
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              borderTopWidth: 1,
            }}
          >
            {/*           <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <Text style={{marginTop: '2%'}}>로그아웃</Text>
          </TouchableOpacity> */}
            <TouchableOpacity>
              <Text style={{ marginTop: "2%" }}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("SignUp");
              }}
            >
              <Text style={{ marginTop: "2%" }}>회원가입</Text>
            </TouchableOpacity>
            <Text></Text>
          </View>
        </View>
      </View>
    </>
  );
}
export default SignIn;
