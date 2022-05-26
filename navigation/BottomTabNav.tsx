import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import SettingMain from "../src/SettingScreens/Main.js";
import Main from "../src/MainScreens/Main";
import CommunityStackNav from "./CommunityStackNav.js";
import { BottomNavList } from "../types/NavigationType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerToBottom } from "../types/PropsBetweenNav.js";
import I18n from "../i18n/index.js";

const Tab = createBottomTabNavigator<BottomNavList>();

const BottomTabNav = (props: DrawerToBottom) => {
  const [clickIcon, setClickIcon] = useState("Home");
  return (
    //BOTTOM TAB NAVIGATION
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        listeners={{
          focus: () => {
            setClickIcon("Home");
          },
        }}
        name={I18n.t("Home")}
        component={Main}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Icon
              name="home"
              size={30}
              color={clickIcon === "Home" ? "#0064ff" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          focus: () => {
            setClickIcon("Community");
          },
        }}
        name={I18n.t("Community")}
        component={CommunityStackNav}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Icon
              name="blackboard"
              size={30}
              color={clickIcon === "Community" ? "#0064ff" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          focus: () => {
            setClickIcon("Setting");
          },
        }}
        name={I18n.t("Setting")}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Icon
              name="grid"
              size={30}
              color={clickIcon === "Setting" ? "#0064ff" : "gray"}
            />
          ),
        }}
        children={() => (
          <SettingMain
            navigation={props.navigation}
            isLogined={props.isLogined}
            setUserInfo={props.setUserInfo}
            userInfo={props.userInfo}
            setIsLogined={props.setIsLogined}
          ></SettingMain>
        )}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNav;
