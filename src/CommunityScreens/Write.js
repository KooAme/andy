import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import axios from "axios";
import I18n from "../../i18n";
import store from "../../redux/store";

function Write(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onSubmit = async () => {
    axios
      .post(
        store.getState().URL + "/bulletin/create",
        { std_id: props.route.params.id, title, content },
        { withCredentials: true }
      )
      .then((res) => {
        props.navigation.reset({ routes: [{ name: "CommunityMain" }] });
      })
      .catch((err) => {
        console.error(err);
      });

    // axios.요청방식(url, {key:value},).then((res)=>console.log(data))
    //url : http://192.168.0.15/community/create_process
  };

  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("CreateDetail")}
        navigation={props.navigation}
      ></AppHeader>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            // onFocus={}
            style={{
              height: "100%",
              paddingLeft: 10,
              fontSize: 20,
            }}
            placeholder={I18n.t("Title")}
          ></TextInput>
        </View>
        <View style={{ flex: 1, backgroundColor: "#e9e9e9" }}></View>
        <View style={{ flex: 5, backgroundColor: "white" }}>
          <TextInput
            style={{
              height: "100%",
              textAlignVertical: "top",
              padding: 10,
              fontSize: 20,
            }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            placeholder={I18n.t("PleaseInput")}
            multiline={true}
          ></TextInput>
        </View>
        <View
          style={{
            // borderTopWidth: 1,
            // borderColor: '#e9e9e9',
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9e9e9",
              borderRadius: 10,

              height: "40%",
              width: "30%",
            }}
          >
            <Text>{I18n.t("Cancle")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9e9e9",

              borderRadius: 10,
              height: "40%",
              width: "30%",
            }}
          >
            <Text>{I18n.t("Regist")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Write;
