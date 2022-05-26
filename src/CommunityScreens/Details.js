import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import Comment from "./Comment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "../../i18n";
import axios from "axios";
import store from "../../redux/store";
import { useFocusEffect } from "@react-navigation/native";

function Details(props) {
  const [commnetValue, setCommentValue] = useState();
  const [isSame, setIsSame] = useState(false);
  const [nowUser, setNowUser] = useState();
  const [commentData, setCommentData] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [hot, setHot] = useState(props.route.params.item.hot);
  const renderItem = ({ item }) => (
    <Comment
      item={item}
      navigation={props.navigation}
      setCommentData={setCommentData}
      setCommentCount={setCommentCount}
    />
  );
  React.useEffect(() => {
    axios
      .post(store.getState().URL + "/comment/inquery", {
        bulletin_id: props.route.params.item.bulletin_id,
      })
      .then((res) => {
        setCommentData(res.data.rows);
        setCommentCount(res.data.count);
      })
      .catch((err) => console.log(err));
  }, []);
  const onSubmitCommnet = () => {
    axios
      .post(store.getState().URL + "/comment/create", {
        content: commnetValue,
        user_id: nowUser,
        bulletin_id: props.route.params.item.bulletin_id,
      })
      .then((res) => {
        axios
          .post(store.getState().URL + "/comment/inquery", {
            bulletin_id: props.route.params.item.bulletin_id,
          })
          .then((res) => {
            setCommentData(res.data.rows);
            setCommentCount(res.data.count);
            setCommentValue("");
          });
        /*  props.navigation.reset({
          routes: [
            {
              name: "CommunityDetails",
              params: {
                item: props.route.params.item,
                id: props.route.params.id,
              },
            },
          ],
        }); */
      })
      .catch((err) => console.log(err));
  };
  const deleteItem = async () => {
    axios
      .delete(store.getState().URL + "/bulletin/delete", {
        data: {
          bulletin_id: props.route.params.item.bulletin_id,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.error(err);
        console.trace(err);
      });
    props.navigation.reset({ index: 0, routes: [{ name: "CommunityMain" }] });
  };
  const clickHot = () => {
    axios
      .post(
        store.getState().URL + "/bulletin/clickHot",
        { id: props.route.params.item.bulletin_id },
        { withCredentials: true }
      )
      .then((res) => setHot(res.data.hot))
      .catch((err) => console.trace(err));
  };
  if (!nowUser) {
    AsyncStorage.getItem("user_info", (err, result) => {
      if (!result) {
        return;
      } else {
        const userInfo = JSON.parse(result);
        if (userInfo.std_id === props.route.params.item.std_id) {
          setIsSame(true);
        } else {
          setIsSame(false);
        }
        setNowUser(userInfo.std_id);
      }
    });
  }
  return (
    <>
      <AppHeader
        title={I18n.t("AnnonymousCommunity")}
        isLeft={true}
        navigation={props.navigation}
      ></AppHeader>
      <View style={{ flex: 1 }}>
        <FlatList
          data={commentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.comment_id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  marginBottom: "5%",
                  paddingLeft: "3%",
                  padding: 5,
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "400",
                      marginRight: 10,
                      color: "black",
                      marginBottom: "2%",
                    }}
                  >
                    {props.route.params.item.title}
                  </Text>
                  {isSame ? (
                    <View style={{ flexDirection: "row", marginRight: "5%" }}>
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          deleteItem();
                        }}
                      >
                        <Text>{I18n.t("Delete")}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate("CommunityUpdate", {
                            item: props.route.params.item,
                            setUpdated,
                          });
                        }}
                      >
                        <Text>{I18n.t("Update")}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 10 }}>
                    ID : {props.route.params.id}
                  </Text>
                  <Text style={{ marginRight: 10 }}>
                    {I18n.t("Views")} : {props.route.params.item.views}
                  </Text>
                  <Text style={{ marginRight: 10 }}>
                    {I18n.t("Hot")} : {hot}
                  </Text>
                  <Text>
                    작성일 :
                    {moment(props.route.params.item.create_date).format(
                      "YYYY-MM-DD"
                    )}{" "}
                  </Text>
                </View>
              </View>
              <Text style={{ marginLeft: 10 }}>
                {props.route.params.item.content}
              </Text>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    clickHot();
                  }}
                  style={{
                    width: "20%",
                    borderWidth: 1,
                    padding: 10,
                    alignItems: "center",
                    margin: "5%",
                  }}
                >
                  <MaterialCommunityIcons
                    name="fire"
                    size={15}
                  ></MaterialCommunityIcons>
                  <Text>{hot}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", marginBottom: "10%" }}
              >
                <TextInput
                  style={{
                    borderWidth: 1,
                    width: "80%",
                    padding: "5%",
                  }}
                  value={commnetValue}
                  onChangeText={(text) => {
                    setCommentValue(text);
                  }}
                  multiline={true}
                ></TextInput>
                <TouchableOpacity
                  onPress={onSubmitCommnet}
                  style={{
                    width: "20%",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>댓글 생성</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: "black", fontSize: 20, margin: "2%" }}>
                댓글 {commentCount}개
              </Text>
            </View>
          }
        />
      </View>
    </>
  );
}

export default Details;
