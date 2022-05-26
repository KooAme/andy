import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AppHeader from "../Custom/AppHeaders";
import axios from "axios";
import store from "../../redux/store";
function Update(props) {
  const [title, setTitle] = useState(props.route.params.item.title);
  const [content, setContent] = useState(props.route.params.item.content);
  const updatePost = () => {
    axios
      .post(store.getState().URL + "/bulletin/update", {
        title,
        content,
        id: props.route.params.item.bulletin_id,
      })
      .then((res) => {
        props.route.params.setUpdated(true);
        props.navigation.reset({
          routes: [{ name: "CommunityMain" }],
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={"작성"}
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
            placeholder={"제목"}
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
            placeholder={"텍스트를 입력 해 주세요."}
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
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9e9e9",
              borderRadius: 10,

              height: "40%",
              width: "30%",
            }}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={updatePost}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e9e9e9",

              borderRadius: 10,
              height: "40%",
              width: "30%",
            }}
          >
            <Text>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default Update;
