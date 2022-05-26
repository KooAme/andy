import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Switch } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CheckIcon from "react-native-vector-icons/FontAwesome";
import store from "../../redux/store";
import I18n from "../../i18n";

function SettingMain(props) {
  /*   store.dispatch({ type: "INCREASE", payload: store.getState().counter });
  console.log(store.getState()); */
  const [isVisiable, setIsVisiable] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(I18n.locale);
  /*   const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0); */
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const onChagneLanguage = async (Language) => {
    await AsyncStorage.setItem("Language", Language);
    I18n.locale = Language;
    props.navigation.reset({ routes: [{ name: "home" }] });
  };
  const logout = () => {
    axios
      .post(store.getState().URL + "/auth/logout")
      .then((res) => console.log(res));
  };
  /*   const onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    setParentHeight(height);
    setParentWidth(width);
  }; */
  return (
    <>
      <AppHeader title={"Setting"} navigation={props.navigation}></AppHeader>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar.Image
            source={require("../public/annonymous.png")}
            size={100}
          ></Avatar.Image>
          <Text style={{ color: "black" }}>
            {props.userInfo ? props.userInfo.std_name : "로그인 해주세요"}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: "10%",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "black", marginLeft: "10%" }}>댓글 알림</Text>
          <Switch
            style={{ marginRight: "10%" }}
            trackColor={{ false: "#767577", true: "0064ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsVisiable(true)}
          style={{
            height: "10%",
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "black", marginLeft: "10%" }}>
            {I18n.t("LanguagueSetting")}
          </Text>
        </TouchableOpacity>
        <Modal animationType={"fade"} visible={isVisiable} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(1,1,1,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }} //모달 백그라운드
          >
            {
              //모달 안쪽
            }
            <View
              style={{ backgroundColor: "white", height: "40%", width: "60%" }}
            >
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#e9e9e9",
                }}
              >
                <Text
                  style={{
                    marginLeft: "10%",
                    fontSize: "100%",
                    fontWeight: "bold",
                  }}
                >
                  언어설정
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onChagneLanguage("ko");
                  }, 100);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10%",
                  }}
                >
                  {selectedLanguage === "ko" ? (
                    <CheckIcon
                      name={"circle"}
                      size={"100%"}
                      color={"#0064ff"}
                    ></CheckIcon>
                  ) : (
                    <CheckIcon
                      name={"circle-thin"}
                      size={"100%"}
                      color={"gray"}
                    ></CheckIcon>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: "60%", marginRight: "10%" }}>
                    한국어
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onChagneLanguage("ch");
                  }, 100);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    marginLeft: "10%",
                  }}
                >
                  {selectedLanguage === "ch" ? (
                    <CheckIcon
                      name={"circle"}
                      size={"100%"}
                      color={"#0064ff"}
                    ></CheckIcon>
                  ) : (
                    <CheckIcon
                      name={"circle-thin"}
                      size={"100%"}
                      color={"gray"}
                    ></CheckIcon>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: "60%", marginRight: "10%" }}>
                    中国語
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    onChagneLanguage("en");
                  }, 100);
                }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    marginLeft: "10%",
                  }}
                >
                  {selectedLanguage === "en" ? (
                    <CheckIcon
                      name={"circle"}
                      size={"100%"}
                      color={"#0064ff"}
                    ></CheckIcon>
                  ) : (
                    <CheckIcon
                      name={"circle-thin"}
                      size={"100%"}
                      color={"gray"}
                    ></CheckIcon>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: "60%", marginRight: "10%" }}>
                    English
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                height: "50%",
                width: "40%",
              }}
            >
              <View
                style={{
                  flex: 1.5,
                  justifyContent: "center",
                  padding: "1%",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  backgroundColor: "white",
                  borderBottomWidth: 2,
                  borderBottomColor: "gray",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                    margin: "3%",
                  }}
                >
                  언어 설정
                </Text>
              </View>

              <View
                style={{
                  flex: 5,
                  flexDirection: "row",
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "5%",
                  }}
                  onLayout={onLayout}
                >
                  <TouchableOpacity
                    style={{
                      height:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      width:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      borderRadius: "50%",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor:
                        selectedLanguage === "ko" ? "#0064ff" : "black",
                    }}
                    onPress={() => setSelected("ko")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: selectedLanguage === "ko" ? "#0064ff" : "black",
                      }}
                    >
                      한국어
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    margin: "2.5%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      width:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      borderRadius: "50%",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor:
                        selectedLanguage === "ch" ? "#0064ff" : "black",
                    }}
                    onPress={() => setSelected("ch")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: selectedLanguage === "ch" ? "#0064ff" : "black",
                      }}
                    >
                      中国語
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "5%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      width:
                        parentHeight > parentWidth ? parentWidth : parentHeight,
                      borderRadius: "50%",
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor:
                        selectedLanguage === "en" ? "#0064ff" : "black",
                    }}
                    onPress={() => setSelected("en")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: selectedLanguage === "en" ? "#0064ff" : "black",
                      }}
                    >
                      ENGLISH
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1.5,
                  flexDirection: "row-reverse",
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  backgroundColor: "white",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: "60%",
                    padding: "2%",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "6%",
                  }}
                  onPress={() => setIsVisiable(false)}
                >
                  <Text style={{ color: "red", fontWeight: "600" }}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: "60%",
                    padding: "2%",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={onChagneLanguage}
                >
                  <Text style={{ color: "#0064ff", fontWeight: "600" }}>
                    제출
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            height: "10%",
            justifyContent: "center",
            borderWidth: 1,
          }}
          onPress={() => alert("v.0.0.1")}
        >
          <Text style={{ color: "black", marginLeft: "10%" }}>Version</Text>
        </TouchableOpacity>
        {props.isLogined ? (
          <TouchableOpacity
            style={{
              height: "10%",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={async () => {
              logout();
              await AsyncStorage.removeItem("user_info");
              props.setUserInfo("");
              props.setIsLogined(false);
              props.navigation.reset({ routes: [{ name: "home" }] });
            }}
          >
            <Icon
              name="log-out"
              size={30}
              style={{ marginLeft: "10%", marginRight: "2%", color: "black" }}
            ></Icon>
            <Text style={{ color: "black", fontWeight: "700" }}>LOGOUT</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}
export default SettingMain;
