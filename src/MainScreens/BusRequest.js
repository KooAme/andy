import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import I18n from "../../i18n";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import CheckIcon from "react-native-vector-icons/FontAwesome";
import store from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BusRequest(props) {
  const [dateVisiable, setdateVisiable] = useState(false);
  const [directionVisiable, setDirectionVisiable] = useState(false);
  const [busStopVisiable, setBusStopVisiable] = useState(false);
  const [timeVisiable, setTimeVisiable] = useState(false);
  const [startDate, setStartDate] = useState();
  const [direction, setDirection] = useState();
  const [selectedBusStop, setSelectedBusStop] = useState();
  const [time, setTime] = useState();
  const [availableBusStop, setAvailableBusStop] = useState();
  const [availableTime, setAvailableTime] = useState();
  const [std_id, setStd_Id] = useState();
  React.useEffect(() => {
    AsyncStorage.getItem("user_info", (error, result) => {
      if (error) {
        return;
      }
      setStd_Id(JSON.parse(result).std_id);
      return;
    });
    if (direction || direction == 0) {
      axios
        .post("http://localhost:3001/businfo/availableBusStop", {
          type: direction,
          bus_date,
        })
        .then((res) => setAvailableBusStop(res.data))
        .catch((err) => console.error(err));
    }
  }, [direction]);
  React.useEffect(() => {
    if (selectedBusStop) {
      axios
        .post("http://localhost:3001/businfo/availableTime", {
          type: direction,
          bus_date,
          bus_stop: selectedBusStop,
        })
        .then((res) => setAvailableTime(res.data));
    }
  }, [selectedBusStop]);
  const directionArr = [
    "복현캠퍼스 > 글로벌캠퍼스",
    "글로벌캠퍼스 > 복현캠퍼스",
  ];
  const getDATE = new Date();
  const NOW =
    getDATE.getMonth() < 10 || getDATE.getDate() < 10
      ? getDATE.getFullYear() +
        "-0" +
        (getDATE.getMonth() + 1) +
        "-0" +
        getDATE.getDate()
      : getDATE.getFullYear() +
        "-" +
        (getDATE.getMonth() + 1) +
        "-" +
        getDATE.getDate();
  const getDay = new Date(startDate).getDay();
  const bus_date = getDay == 0 || getDay == 6 ? 1 : 0;
  const onBusReq = () => {
    axios
      .post(store.getState().URL + "/bus/create", {
        bus_date: startDate,
        bus_way: direction,
        bus_stop: selectedBusStop,
        bus_time: time,
        std_id,
      })
      .then((res) => {
        props.navigation.navigate("BusInquery");
      })
      .catch((err) => console.error(error));
  };
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={I18n.t("BusRequest")}
        isLeft={true}
      ></AppHeader>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}
            >
              <Text
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {I18n.t("Date")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setdateVisiable(true);
                setSelectedBusStop("");
                setTime("");
              }}
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {startDate}
              </Text>
            </TouchableOpacity>
            <Modal visible={dateVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: "50%",
                    width: "50%",
                    backgroundColor: "white",
                  }}
                >
                  <Calendar
                    current={NOW}
                    minDate={NOW}
                    onDayPress={(day) => {
                      setStartDate(day.dateString);
                      setdateVisiable(false);
                    }}
                    monthFormat={"yyyy MM"}
                  ></Calendar>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}
            >
              <Text
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {I18n.t("Direction")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setDirectionVisiable(true)}
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {direction == 0 || direction ? directionArr[direction] : ""}
              </Text>
            </TouchableOpacity>
            <Modal visible={directionVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: "30%",
                    width: "60%",
                    backgroundColor: "white",
                  }}
                >
                  <View style={{ flex: 0.7, justifyContent: "center" }}>
                    <Text
                      style={{
                        marginLeft: "10%",
                        fontSize: "100%",
                        fontWeight: "bold",
                      }}
                    >
                      {I18n.t("Direction")}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setDirectionVisiable(false);
                      setDirection(0);
                      setSelectedBusStop("");
                      setTime("");
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
                        marginLeft: "10%",
                      }}
                    >
                      {direction === 0 ? (
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
                        marginLeft: "10%",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: "60%" }}>{directionArr[0]}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDirectionVisiable(false);
                      setDirection(1);
                      setSelectedBusStop("");
                      setTime("");
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
                        marginLeft: "10%",
                      }}
                    >
                      {direction === 1 ? (
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
                        marginLeft: "10%",
                      }}
                    >
                      <Text style={{ fontSize: "60%" }}>{directionArr[1]}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}
            >
              <Text
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {I18n.t("BusStop")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                startDate && (direction || direction === 0)
                  ? setBusStopVisiable(true)
                  : alert("출발일자와 방면을 설정하지 않았습니다.");
                setTime();
              }}
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {selectedBusStop}
              </Text>
            </TouchableOpacity>
            <Modal visible={busStopVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "70%",
                    height: "40%",
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "20%",
                      borderBottomColor: "#e9e9e9",
                      borderBottomWidth: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: "10%",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {I18n.t("BusStop")}
                    </Text>
                  </View>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={availableBusStop}
                    keyExtractor={(item) => item.bus_id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setBusStopVisiable(false);
                          setSelectedBusStop(item.bus_stop);
                        }}
                        style={{
                          borderTopWidth: 1,
                          borderColor: "navy",
                          flexDirection: "row",
                          padding: 10,
                          backgroundColor: "white",
                        }}
                      >
                        {selectedBusStop === item.bus_stop ? (
                          <CheckIcon
                            name={"circle"}
                            size={"100%"}
                            color={"#0064ff"}
                          ></CheckIcon>
                        ) : (
                          <CheckIcon
                            name={"circle-thin"}
                            size={"100%"}
                            color={"#0064ff"}
                          ></CheckIcon>
                        )}
                        <Text style={{ marginLeft: "10%" }}>
                          {item.bus_stop}
                        </Text>
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 2,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}
            >
              <Text
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {I18n.t("Time")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                (startDate && (direction || direction === 0)) || selectedBusStop
                  ? setTimeVisiable(true)
                  : alert("시작일자와 방면, 버스정류장을 선택하지 않았습니다.")
              }
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>{time}</Text>
            </TouchableOpacity>
            <Modal visible={timeVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "70%",
                    height: "40%",
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      height: "20%",
                      width: "100%",
                      borderBottomColor: "#e9e9e9",
                      borderBottomWidth: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: "10%",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {I18n.t("Time")}
                    </Text>
                  </View>
                  <FlatList
                    data={availableTime}
                    keyExtractor={(item) => item.bus_id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setTime(item.bus_time);
                          setTimeVisiable(false);
                        }}
                        style={{
                          borderTopWidth: 1,
                          borderColor: "navy",
                          flexDirection: "row",
                          padding: 10,
                          backgroundColor: "white",
                        }}
                      >
                        {time === item.bus_time ? (
                          <CheckIcon
                            name={"circle"}
                            size={"100%"}
                            color={"#0064ff"}
                          ></CheckIcon>
                        ) : (
                          <CheckIcon
                            name={"circle-thin"}
                            size={"100%"}
                            color={"#0064ff"}
                          ></CheckIcon>
                        )}
                        <Text style={{ marginLeft: "10%" }}>
                          {item.bus_time}
                        </Text>
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                </View>
              </View>
            </Modal>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={onBusReq}
              style={{
                width: "70%",
                height: "50%",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0064ff",
              }}
            >
              <Text
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {I18n.t("Request")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default BusRequest;
