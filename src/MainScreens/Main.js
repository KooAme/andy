import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import MealSwiper from '../Custom/MealSwiper';
import I18n from '../../i18n';
function Main(props) {
  const grid = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    element: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      margin: '3%',
    },
  });
  const [parentHeight, setParentHeight] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const onLayout = (event) => {
    const { height, width } = event.nativeEvent.layout;
    setParentHeight(height - 20);
    setParentWidth(width - 20);
  };
  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <AppHeader
        navigation={props.navigation}
        title={'Global Campus'}
        isLeft={false}
      ></AppHeader>
      {/*HEADER*/}
      <MealSwiper></MealSwiper>
      {/*식사SWIPER*/}
      <View style={grid.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '20%',
            }}
            onLayout={onLayout}
            onPress={() => {
              props.navigation.navigate('BusInquery');
            }}
          >
            <Image
              source={require('../public/shuttleBus.png')}
              style={{
                borderWidth: 0,
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            ></Image>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
              {I18n.t('Bus')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '20%',
            }}
            onPress={() => {
              props.navigation.navigate('OutInquery');
            }}
          >
            <Image
              source={require('../public/out.png')}
              style={{
                borderWidth: 0,
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            ></Image>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
              {I18n.t('Out')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '20%',
            }}
            onPress={() => {
              props.navigation.navigate('GymInquery');
            }}
          >
            <Image
              source={require('../public/gym.png')}
              style={{
                borderWidth: 0,
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            ></Image>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
              {I18n.t('Gym')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '20%',
            }}
            onPress={() => {
              props.navigation.navigate('ASInquery');
            }}
          >
            <Image
              source={require('../public/repair.png')}
              style={{
                borderWidth: 0,
                height: parentHeight > parentWidth ? parentWidth : parentHeight,
                width: parentHeight > parentWidth ? parentWidth : parentHeight,
              }}
            ></Image>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
              {I18n.t('AS')}
            </Text>
          </TouchableOpacity>
        </View>
        {/*<View>
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("BusInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "#0067A3",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("Bus")}
              </Text>
              <Avatar.Image
                source={require("../public/shuttleBus.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("OutInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("Out")}
              </Text>
              <Avatar.Image
                source={require("../public/sotobaku.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("GymInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "orange",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("Gym")}
              </Text>
              <Avatar.Image
                source={require("../public/health.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              props.navigation.navigate("ASInquery");
            }}
          >
            <View style={grid.element}>
              <Text
                style={{
                  color: "navy",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {I18n.t("AS")}
              </Text>
              <Avatar.Image
                source={require("../public/AS.png")}
                style={{ backgroundColor: "white" }}
                size={120}
              ></Avatar.Image>
            </View>
          </TouchableOpacity>
        </View>*/}
      </View>
    </View>
  );
}
export default Main;
