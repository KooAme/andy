import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import AppHeader from "../Custom/AppHeaders";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../Custom/CustomButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SetCommunityItems from "../utils/SetCommunityItems";
import axios from "axios";
import I18n from "../../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import store from "../../redux/store";

function Main(props) {
  const [data, setData] = useState();
  const [noticeMode, setNoticeMode] = useState("ALL");
  const [id, setId] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchVisiable, setSearchVisiable] = useState(false);
  const renderItem = ({ item }) => (
    <SetCommunityItems item={item} navigation={props.navigation} />
  );
  const searchData = () => {
    axios
      .post(store.getState().URL + "/bulletin/search", { title: searchValue })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadUserData = (mode) => {
    if (mode === "HOT") {
      axios
        .post(store.getState().URL + "/hot/inquire")
        .then((res) => setData(res.data));
    } else {
      axios
        .post(store.getState().URL + "/bulletin/inquery")
        .then((res) => {
          setRefreshing(false);
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  React.useEffect(() => {
    loadUserData(noticeMode);
    if (id === undefined) {
      AsyncStorage.getItem("user_info", (err, result) => {
        if (result) {
          setId(JSON.parse(result).std_id);
        } else {
          setId();
        }
      });
    }
  }, [noticeMode]);

  const noticeModeChanger = (mode) => {
    if (mode === "ALL") {
      return (
        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: "5%" }}>
          {I18n.t("Entire")}
        </Text>
      );
    } else if (mode === "공지사항") {
      return (
        <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: "5%" }}>
          {I18n.t("Notice")}
        </Text>
      );
    } else if (mode === "HOT") {
      return (
        <View style={{ flexDirection: "row", marginLeft: "3%" }}>
          <MaterialCommunityIcons
            name="fire"
            size={30}
          ></MaterialCommunityIcons>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>HOT</Text>
        </View>
      );
    }
  };
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={I18n.t("AnnonymousCommunity")}
        type={"community"}
      ></AppHeader>

      <View style={{ height: "7%", width: "100%" }}>
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
            borderBottomColor: "#e9e9e9",
            borderBottomWidth: 1,
          }}
        >
          {noticeModeChanger(noticeMode)}
          {
            //state로 Mode 조정 예정
          }
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Icon name="bells" size={30}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (id) {
                  props.navigation.navigate({
                    name: "CommunityWrite",
                    params: { id: id },
                  });
                } else {
                  alert("로그인 후 이용해주세요");
                }
              }}
              style={{ marginRight: 10 }}
            >
              <Icon name="edit" size={30}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => setSearchVisiable(!searchVisiable)}
            >
              <Icon name="search1" size={30}></Icon>
            </TouchableOpacity>
            {searchVisiable ? (
              <TextInput
                style={{
                  backgroundColor: "white",
                  width: "70%",
                  padding: 0,
                  paddingLeft: 10,
                  borderRadius: 30,
                  marginRight: "1%",
                }}
                placeholder="제목을 입력해주세요"
                value={searchValue}
                autoFocus={true}
                blurOnSubmit={() => {
                  return true;
                }}
                onSubmitEditing={searchData}
                onChangeText={(text) => setSearchValue(text)}
              ></TextInput>
            ) : (
              <></>
            )}
          </View>
        </View>
        {
          //Title and alarms and search, write
        }
      </View>

      {
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.bulletin_id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={7}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
          }
          ListHeaderComponent={
            <>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <View style={{ marginLeft: "5%" }}>
                  <CustomButton
                    onPress={() => {
                      setNoticeMode("ALL");
                    }}
                    title={I18n.t("Entire")}
                    color="rgba(0,0,0,0)"
                    textColor="black"
                  ></CustomButton>
                </View>
                <View style={{ marginLeft: "5%" }}>
                  <CustomButton
                    onPress={() => {
                      setNoticeMode("HOT");
                    }}
                    title="HOT"
                    color="rgba(0,0,0,0)"
                    textColor="black"
                    icon={() => (
                      <MaterialCommunityIcons
                        name="fire"
                        size={15}
                      ></MaterialCommunityIcons>
                    )}
                  ></CustomButton>
                </View>
                <View style={{ marginLeft: "5%" }}>
                  <CustomButton
                    onPress={() => {
                      setNoticeMode("공지사항");
                    }}
                    title={I18n.t("Notice")}
                    color="rgba(0,0,0,0)"
                    textColor="black"
                  ></CustomButton>
                </View>
              </View>
              {refreshing ? <ActivityIndicator /> : null}
            </>
          }
        />
      }
      {/*  <View
          style={{
            flexDirection: 'row',
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}>
          <View style={{marginLeft: '5%'}}>
            <CustomButton
              title="전체"
              color="rgba(0,0,0,0)"
              textColor="black"></CustomButton>
          </View>
          <View style={{marginLeft: '5%'}}>
            <CustomButton
              title="HOT"
              color="rgba(0,0,0,0)"
              textColor="black"
              icon={() => (
                <MaterialCommunityIcons
                  name="fire"
                  size={15}></MaterialCommunityIcons>
              )}></CustomButton>
          </View>
        </View> */}
    </>
  );
}
export default Main;
