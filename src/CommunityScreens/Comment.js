import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import I18n from "../../i18n";
import moment from "moment";
import crypto from "crypto";
import axios from "axios";
import store from "../../redux/store";
import "moment/locale/ko";

const Comment = (props) => {
  const [userId, setUserId] = useState();
  React.useEffect(() => {
    hashId();
  }, []);
  const hashId = () => {
    let hash = String(props.item.std_id);
    crypto.pbkdf2(hash, "salt", 10, 64, "sha512", (err, derivedKey) => {
      setUserId(derivedKey.toString("hex").substring(5, 12)); // '3745e48...08d59ae'
    });
  };

  const onDeleteComment = () => {
    axios
      .delete(store.getState().URL + "/comment/delete", {
        data: { comment_id: props.item.comment_id },
      })
      .then((res) => {
        axios
          .post(store.getState().URL + "/comment/inquery", {
            bulletin_id: props.item.bulletin_id,
          })
          .then((res) => {
            props.setCommentData(res.data.rows);
            props.setCommentCount(res.data.count);
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <View style={{ borderWidth: 1, padding: 5, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>작성자 : </Text>
        <Text style={styles.content}>
          {userId}
          {"\t"}
        </Text>
        <Text style={styles.title}>작성일 : </Text>
        <Text style={styles.content}>
          {moment(props.item.create_date).fromNow()}
        </Text>
      </View>
      <View style={{ flexDirection: "row-reverse", marginLeft: 10 }}>
        <TouchableOpacity onPress={onDeleteComment}>
          <Text>{I18n.t("Delete")}</Text>
        </TouchableOpacity>
      </View>
      <Text>{props.item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "black",
  },
  content: {
    marginRight: "1%",
  },
});
export default Comment;
