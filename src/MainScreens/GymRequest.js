import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AppHeader from '../Custom/AppHeaders';
import I18n from '../../i18n';
import Constants from 'expo-constants';

function GymRequest(props) {
  /* */
  const [startVisiable, setStartVisiable] = useState(false);
  const [endVisiable, setEndVisiable] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
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
  const week = new Array(
    I18n.t('Sunday'),
    I18n.t('Monday'),
    I18n.t('Tuesday'),
    I18n.t('Wednesday'),
    I18n.t('Thursday'),
    I18n.t('Friday'),
    I18n.t('Saturday')
  );
  const getDay = new Date(selectedDate).getDay();
  const Day = week[getDay] || '';

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const BUTTON_HEIGHT = 50;
  const VIEW_HEIGHT = 50 * 3;

  const styles = StyleSheet.create({
    scrollView: {
      width: 60,
    },
    container: {
      width: '30%',
      alignSelf: 'center',
      flexDirection: 'row',
      height: VIEW_HEIGHT,
      backgroundColor: 'white',
    },
    view: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 8,
    },
    button: {
      height: BUTTON_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '20px',
    },
    buttonLabel: {
      fontWeight: 'bold',
    },
    overlay: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlayVisibleView: {
      width: '100%',
      height: BUTTON_HEIGHT,
      flexDirection: 'row',
    },
    overlayVisibleViewInner: {
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#c8c8c8',
    },
  });

  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={I18n.t('GymRequest')}
        isLeft={true}
      ></AppHeader>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Calendar
          current={NOW}
          minDate={NOW}
          onDayPress={(day) => {
            console.log('selected day', day);
            setSelectedDate(day.dateString);
          }}
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          monthFormat={'yyyy MM'}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: 'blue',
            },
          }}
        />
        <View style={{ marginTop: '10%', height: '10%' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
              {I18n.t('Date')}{' '}
            </Text>
            <TextInput
              style={{
                color: 'black',
                width: '80%',
                borderColor: 'black',
                borderWidth: 2,
                padding: '1%',
              }}
              value={selectedDate + ' ' + Day}
              editable={false}
            ></TextInput>
          </View>
        </View>
        <View style={{ height: '10%' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
              {I18n.t('Time')}
            </Text>
            <TouchableOpacity
              style={{
                height: '50%',
                width: '30%',
                borderWidth: 1,
                marginLeft: '1%',
              }}
              onPress={() => setStartVisiable(true)}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: '100%', fontWeight: 'bold' }}>
                  {startTime}시
                </Text>
              </View>
            </TouchableOpacity>
            <Modal
              visible={startVisiable}
              transparent={true}
              animationType='slide'
            >
              <View style={styles.view}>
                <View style={styles.container}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}
                  >
                    {[
                      '',
                      '06',
                      '07',
                      '08',
                      '09',
                      '10',
                      '11',
                      '12',
                      '13',
                      '14',
                      '15',
                      '16',
                      '17',
                      '18',
                      '19',
                      '20',
                      '21',
                      '',
                    ].map((item, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          setStartTime(item);
                          setStartVisiable(false);
                        }}
                        key={index}
                      >
                        <View style={styles.button}>
                          <Text style={styles.buttonLabel}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View
                    pointerEvents={'none'}
                    style={[StyleSheet.absoluteFill, styles.overlay]}
                  >
                    <View style={styles.overlayVisibleView}>
                      <View style={styles.overlayVisibleViewInner} />
                      <View
                        style={[
                          styles.overlayVisibleViewInner,
                          { marginLeft: 12 },
                        ]}
                      />
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 12,
                        }}
                      >
                        <Text style={styles.buttonLabel}>{':'}</Text>
                      </View>
                      <View style={styles.overlayVisibleViewInner} />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={{
                height: '50%',
                width: '19%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 50, fontWeight: 'bold' }}>~</Text>
            </View>
            <View style={{ height: '50%', width: '30%', borderWidth: 1 }}>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: '100%',
                }}
                onPress={() => setStartVisiable(true)}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: '100%', fontWeight: 'bold' }}>
                    {endTime}시
                  </Text>
                </View>
              </TouchableOpacity>

              <Modal
                visible={endVisiable}
                transparent={true}
                animationType='slide'
              >
                <View style={styles.view}>
                  <View style={styles.container}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.scrollView}
                    >
                      {[
                        '',
                        '06',
                        '07',
                        '08',
                        '09',
                        '10',
                        '11',
                        '12',
                        '13',
                        '14',
                        '15',
                        '16',
                        '17',
                        '18',
                        '19',
                        '20',
                        '21',
                        '',
                      ].map((item, index) => (
                        <TouchableOpacity
                          onPress={() => {
                            setEndTime(item);
                            setEndVisiable(false);
                          }}
                          key={index}
                        >
                          <View style={styles.button}>
                            <Text style={styles.buttonLabel}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <View
                      pointerEvents={'none'}
                      style={[StyleSheet.absoluteFill, styles.overlay]}
                    >
                      <View style={styles.overlayVisibleView}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 12,
                          }}
                        ></View>
                        <View style={styles.overlayVisibleViewInner} />
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
          <View style={{ width: '90%' }}>
            <Button color='navy' title={I18n.t('Request')}></Button>
          </View>
        </View>
      </View>
    </>
  );
}

export default GymRequest;
