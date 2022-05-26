import React, { useState } from "react";
import Main from "../src/CommunityScreens/Main";
import Details from "../src/CommunityScreens/Details";
import Write from "../src/CommunityScreens/Write";
import Update from "../src/CommunityScreens/Update";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function CommunityStackNav(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ unmountOnBlur: true }}
        name="CommunityMain"
        component={Main}
      ></Stack.Screen>
      <Stack.Screen
        options={{ unmountOnBlur: true }}
        name="CommunityDetails"
        component={Details}
      ></Stack.Screen>
      <Stack.Screen
        options={{ unmountOnBlur: true }}
        name="CommunityWrite"
        component={Write}
      ></Stack.Screen>
      <Stack.Screen
        options={{ unmountOnBlur: true }}
        name="CommunityUpdate"
        component={Update}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
export default CommunityStackNav;
