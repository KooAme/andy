import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import axios from "axios";
import crypto from "crypto";
import store from "../../redux/store";

const SetCommunityItems = (props) => {
  const [userName, setUserName] = useState();
  const [commentCount, setCommentCount] = useState();
  const watched = (id) => {
    axios
      .post(
        store.getState().URL + "/bulletin/watch",
        {
          id,
        },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.trace(err));
  };
  React.useEffect(() => {
    userId();
    axios
      .post(store.getState().URL + "/comment/inquery", {
        bulletin_id: props.item.bulletin_id,
      })
      .then((res) => {
        const data = res.data.count;
        setCommentCount(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const userId = () => {
    let hash = String(props.item.std_id);
    crypto.pbkdf2(hash, "salt", 10, 64, "sha512", (err, derivedKey) => {
      setUserName(derivedKey.toString("hex").substring(5, 12)); // '3745e48...08d59ae'
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        watched(props.item.bulletin_id);
        props.navigation.navigate("CommunityDetails", {
          item: props.item,
          id: userName,
        });
      }}
    >
      <View style={styles.item}>
        <View style={{ width: "80%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginRight: 10,
                color: "black",
              }}
            >
              {props.item.title}
            </Text>
            <Text style={{ color: "red" }}>({commentCount}) </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingRight: 10 }}>
              {moment(props.item.date).format("YYYY-MM-DD")}
            </Text>
            <Text style={{ paddingRight: 10 }}>
              조회수 : {props.item.views}
            </Text>
            <Text>ID :{userName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "10%",
          }}
        >
          <Text>{props.item.hot}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderTopWidth: 1,
    borderColor: "navy",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  title: {
    fontSize: 50,
  },
});

export default SetCommunityItems;
