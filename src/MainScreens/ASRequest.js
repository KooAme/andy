import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AppHeader from "../Custom/AppHeaders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import I18n from "../../i18n";
import store from "../../redux/store";

function ASRequest(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [vst_check, setVst_check] = useState(false);
  const [std_id, setStd_id] = useState();
  const [asId, setAsId] = useState();

  React.useEffect(() => {
    if (props.route.params) {
      setTitle(props.route.params.title);
      setContent(props.route.params.content);
      setAsId(props.route.params.id);
    }
    AsyncStorage.getItem("user_info", (err, result) => {
      if (!result) {
        return;
      } else {
        setStd_id(JSON.parse(result).std_id);
      }
    });
  }, []);
  const onASSubmit = () => {
    if (props.route.params) {
      axios
        .patch(
          store.getState().URL + "/as/update",
          { title, content, vst_check, std_id, as_id: asId },
          { withCredentials: true }
        )
        .then((res) => {
          props.navigation.navigate("ASInquery");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          store.getState().URL + "/as/create",
          { title, content, vst_check, std_id },
          { withCredentials: true }
        )
        .then((res) => {
          props.navigation.navigate("ASInquery");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t("ASRequest")}
        navigation={props.navigation}
      ></AppHeader>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            height: "10%",
            width: "90%",
            margin: "5%",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {I18n.t("Title")}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 0,
              margin: 0,
              height: "80%",
              borderColor: "#212121",
            }}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            maxLength={50}
          ></TextInput>
        </View>

        <View
          style={{
            height: "60%",
            width: "90%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              padding: 0,
              margin: 0,
            }}
          >
            {I18n.t("Content")}
          </Text>
          <TextInput
            style={{ borderWidth: 1, height: "90%", borderColor: "#212121" }}
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            maxLength={500}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "7%",
          }}
        >
          <CheckBox
            value={vst_check}
            onValueChange={() => setVst_check(!vst_check)}
          ></CheckBox>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            {I18n.t("BuzaeAgree")}
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: "25%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#0064ff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={() => {
              onASSubmit();
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
                {I18n.t("Request")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default ASRequest;
