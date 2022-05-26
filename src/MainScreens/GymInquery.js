import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AppHeader from '../Custom/AppHeaders';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import I18n from '../../i18n';

function GymInquery(props) {
  /*
    @params startDate  : 시작 날짜의 value
    @params endDate    : 끝 날짜의 value
    warning ! moment로 날짜를 문자형식으로 formatting 한후 가 아니면 error발생 Type Error
  */

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startVisiable, setStartVisiable] = useState(false);
  const [endVisiable, setEndVisiable] = useState(false);
  const titles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const details = StyleSheet.create({
    innerbox: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    font: {
      fontWeight: 'bold',
      color: 'black',
    },
  });
  const getDATE = new Date();
  const NOW =
    getDATE.getMonth() < 10 || getDATE.getDate() < 10
      ? getDATE.getFullYear() +
        '-0' +
        (getDATE.getMonth() + 1) +
        '-0' +
        getDATE.getDate()
      : getDATE.getFullYear() +
        '-' +
        (getDATE.getMonth() + 1) +
        '-' +
        getDATE.getDate();
  return (
    <>
      <AppHeader
        isLeft={true}
        title={I18n.t('GymInquery')}
        navigation={props.navigation}
      ></AppHeader>
      <View
        style={{
          height: '90%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            height: '10%',
            borderWidth: 1,
            marginTop: '5%',
            borderRadius: 15,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: '80%',
              flexDirection: 'column',
            }}
          >
            <View style={titles.container}>
              <TouchableOpacity
                style={titles.container}
                onPress={() => setStartVisiable(true)}
              >
                <View style={{ width: '100%' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {startDate
                      ? moment(startDate).format(
                          '          YYYY' +
                            I18n.t('year') +
                            '          MM' +
                            I18n.t('month') +
                            '          DD' +
                            I18n.t('day')
                        )
                      : '          ' +
                        I18n.t('year') +
                        '          ' +
                        I18n.t('month') +
                        '          ' +
                        I18n.t('day')}
                  </Text>
                </View>
              </TouchableOpacity>
              <Modal visible={startVisiable}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: '50%',
                      width: '50%',
                      backgroundColor: 'white',
                    }}
                  >
                    <Calendar
                      enableSwipeMonths={true}
                      current={NOW}
                      minDate={NOW}
                      onDayPress={(day) => {
                        console.log('selected day', day);
                        setStartDate(day.dateString);
                        setStartVisiable(false);
                      }}
                      monthFormat={'yyyy MM'}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View style={titles.container}>
              <Text>~</Text>
            </View>
            <View style={titles.container}>
              <TouchableOpacity
                style={titles.container}
                onPress={() =>
                  startDate
                    ? setEndVisiable(true)
                    : alert('시작 일자를 먼저 선택해 주세요.')
                }
              >
                <View style={{ width: '100%' }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>
                    {endDate
                      ? moment(endDate).format(
                          '          YYYY' +
                            I18n.t('year') +
                            '          MM' +
                            I18n.t('month') +
                            '          DD' +
                            I18n.t('day')
                        )
                      : '          ' +
                        I18n.t('year') +
                        '          ' +
                        I18n.t('month') +
                        '          ' +
                        I18n.t('day')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Modal visible={endVisiable} transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    height: '50%',
                    width: '50%',
                    backgroundColor: 'white',
                  }}
                >
                  <Calendar
                    current={NOW}
                    minDate={moment(startDate).format('YYYY-MM-DD')}
                    onDayPress={(day) => {
                      console.log('selected day', day);
                      setEndDate(day.dateString);
                      setEndVisiable(false);
                    }}
                    monthFormat={'yyyy MM'}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ width: '20%' }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Text
                style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}
              >
                {I18n.t('Inquery')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            height: '80%',
            borderWidth: 1,
            marginTop: '1%',
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: '5%',
              marginBottom: '5%',
            }}
          >
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t('Date')}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t('Time')}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}>{I18n.t('Condition')}</Text>
            </View>
            <View style={details.innerbox}>
              <Text style={details.font}></Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
export default GymInquery;
