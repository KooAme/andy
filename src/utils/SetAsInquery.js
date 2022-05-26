import React from "react";
import moment from "moment";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "../../i18n";
const details = StyleSheet.create({
  innerbox: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  font: {
    fontWeight: "bold",
    color: "black",
  },
});
function SetAsInquery(props) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <View style={details.innerbox}>
          <Text style={details.font}>
            {moment(props.item.request_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>{props.item.title}</Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {props.item.repair_date ? (
              moment(props.item.repair_date).format("YYYY-MM-DD")
            ) : (
              <></>
            )}
          </Text>
        </View>
        <View style={details.innerbox}>
          {props.item.repair_data ? (
            <TouchableOpacity>
              <Text style={details.font}>삭제</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("ASRequest", {
                  content: props.item.content,
                  title: props.item.title,
                  id: props.item.as_id,
                })
              }
            >
              <Text style={details.font}>수정</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
export default SetAsInquery;
