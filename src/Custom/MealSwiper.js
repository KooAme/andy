import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper/src';

function MealSwiper() {
  const swiperStyles = StyleSheet.create({
    title: {
      position: 'absolute',
      top: '7%',
      backgroundColor: 'white',
      zIndex: 100,
      width: '40%',
      alignItems: 'center',
    },
    titleFont: {
      fontWeight: 'bold',
      color: 'black',
    },
    outerBox: {
      height: '80%',
      width: '90%',
      borderColor: 'navy',
      borderWidth: 1,
      borderRadius: 15,
    },
    innerBox: {
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: '5%',
      alignItems: 'center',
    },
    centerAlign: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '5%',
    },
    typeBox: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    typeTitle: {
      fontWeight: 'bold',
      color: 'black',
      marginBottom: '5%',
    },
  });
  return (
    <Swiper
      style={{
        height: '90%',
      }}
      showsButtons={true}
      showsPagination={false}
    >
      <View
        style={{
          borderColor: 'blue',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={swiperStyles.title}>
          <Text style={swiperStyles.titleFont}>04월 29일 금요일</Text>
        </View>
        <View style={swiperStyles.outerBox}>
          <View style={swiperStyles.innerBox}>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>조식</Text>
                <Text>백미밥</Text>
                <Text>호박새우젓국</Text>
                <Text>제육볶음</Text>
                <Text>두부조림</Text>
                <Text>브로콜리+초장</Text>
                <Text>포기김치</Text>
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>중식</Text>
                <Text>백미밥</Text>
                <Text>부대찌개</Text>
                <Text>춘천닭갈비</Text>
                <Text>김말이튀김</Text>
                <Text>세발나물겉절이</Text>
                <Text>깍두기</Text>
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>석식</Text>
                <Text>백미밥</Text>
                <Text>북어맑은국</Text>
                <Text>동파육</Text>
                <Text>멀치견과류볶음</Text>
                <Text>콩나물무침</Text>
                <Text>포기김치</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {
        //절취선입니다
      }
      <View
        style={{
          borderColor: 'blue',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={swiperStyles.title}>
          <Text style={swiperStyles.titleFont}>04월 29일 금요일</Text>
        </View>
        <View style={swiperStyles.outerBox}>
          <View style={swiperStyles.innerBox}>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>조식</Text>
                <Text>백미밥</Text>
                <Text>호박새우젓국</Text>
                <Text>제육볶음</Text>
                <Text>두부조림</Text>
                <Text>브로콜리+초장</Text>
                <Text>포기김치</Text>
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>중식</Text>
                <Text>백미밥</Text>
                <Text>부대찌개</Text>
                <Text>춘천닭갈비</Text>
                <Text>김말이튀김</Text>
                <Text>세발나물겉절이</Text>
                <Text>깍두기</Text>
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>석식</Text>
                <Text>백미밥</Text>
                <Text>북어맑은국</Text>
                <Text>동파육</Text>
                <Text>멀치견과류볶음</Text>
                <Text>콩나물무침</Text>
                <Text>포기김치</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {
        //둘
      }
      <View
        style={{
          borderColor: 'blue',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={swiperStyles.title}>
          <Text style={swiperStyles.titleFont}>04월 29일 금요일</Text>
        </View>
        <View style={swiperStyles.outerBox}>
          <View style={swiperStyles.innerBox}>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>조식</Text>
                <Text>백미밥</Text>
                <Text>호박새우젓국</Text>
                <Text>제육볶음</Text>
                <Text>두부조림</Text>
                <Text>브로콜리+초장</Text>
                <Text>포기김치</Text>
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>중식</Text>
                <Text>백미밥</Text>
                <Text>부대찌개</Text>
                <Text>춘천닭갈비</Text>
                <Text>김말이튀김</Text>
                <Text>세발나물겉절이</Text>
                <Text>깍두기</Text>
              </View>
            </View>
            <View style={swiperStyles.centerAlign}>
              <View style={swiperStyles.typeBox}>
                <Text style={swiperStyles.typeTitle}>석식</Text>
                <Text>백미밥</Text>
                <Text>북어맑은국</Text>
                <Text>동파육</Text>
                <Text>멀치견과류볶음</Text>
                <Text>콩나물무침</Text>
                <Text>포기김치</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swiper>
  );
}
export default MealSwiper;
