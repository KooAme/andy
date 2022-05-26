import React from "react";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
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
function SetOutInquery(props) {
  console.log(props.item);
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
            {moment(props.item.start_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}>
            {moment(props.item.end_date).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={details.innerbox}>
          <Text style={details.font}></Text>
        </View>
      </View>
    </>
  );
}
export default SetOutInquery;
