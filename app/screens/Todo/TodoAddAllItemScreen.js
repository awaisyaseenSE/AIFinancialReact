import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import {useNavigation} from '@react-navigation/native';
import TodoTopHomeCompo from './components/TodoTopHomeCompo';
import colors from '../../config/colors';
import TextInputComponent from '../../components/TextInputComponent';
import fontFamily from '../../config/fontFamily';
import ButtonComponent from '../../components/ButtonComponent';
import TodoGetTimeListCompo from './components/TodoGetTimeListCompo';
import DatePicker from 'react-native-date-picker';
import {handleStoreTodoData} from '../../utils/storageUtils';
import {scheduleNotification} from '../../utils/handlNotification';
import TopCompoWithHeading from '../../components/TopCompoWithHeading';

export default function TodoAddAllItemScreen({route}) {
  const taskTitle = route?.params?.taskTitle;
  const taskDate = route?.params?.taskDate;

  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [timeError, setTimeError] = useState('');
  const [notification, setNotification] = useState('');
  const [showNotifi, setShowNotifi] = useState(true);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => setShowNotifi(previousState => !previousState);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleTimePickerModal = () => {
    setShowTimePicker(!showTimePicker);
  };

  const handleClearData = data => {
    setTitle('');
    setDesc('');
    setTime('');
    setNotification('');
    Keyboard.dismiss();
    scheduleNotification(data, taskDate);
  };

  const handleAddNewTask = async () => {
    try {
      if (title === '') {
        setTitleError('Title is required!');
      } else {
        setTitleError('');
      }

      if (time === '') {
        setTimeError('Time is required!');
      } else {
        setTimeError('');
      }

      if (title !== '' && time !== '') {
        setLoading(true);

        const currentDate = new Date();
        // let notifi_date = time.toLocaleDateString();
        // let notifi_time = time.toLocaleTimeString();
        // let jjj = notification.toDateString();
        // console.log(jjj);

        let id = Date.now().toString();
        const todoItem = {
          id: id,
          title: title,
          time: time,
          notification: notification,
          showNotification: JSON.stringify(showNotifi),
          desc: desc,
          skip: JSON.stringify(false),
          done: JSON.stringify(false),
          date: taskDate,
        };

        // console.log(todoItem);

        let res = await handleStoreTodoData(todoItem);
        if (res) {
          Alert.alert('Task is added successfully!');
          setLoading(false);
        } else {
          Alert.alert('Try again!', 'Some thing went wrong!');
          setLoading(false);
        }
        let taskData = {
          time,
          title,
          id,
          notification,
          showNotifi,
        };
        handleClearData(taskData);
      }
    } catch (error) {
      console.log(
        'Error while storing todo new task in async storage: ',
        error,
      );
      setLoading(false);
    }
  };

  function pad(d) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }

  return (
    <>
      <ScreenComponent
        style={{backgroundColor: colors.primary}}
        content={'light-content'}>
        <TopCompoWithHeading
          title={taskTitle}
          titleStyle={{color: colors.white}}
          backIconStyle={{tintColor: colors.white}}
          onPress={() => navigation.navigate('TodoAllTaskScreen')}
        />
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View>
              <TextInputComponent
                placeholder="Task Name"
                placeholderTextColor={colors.gray}
                value={title}
                onChangeText={text => {
                  if (text.trim().length) {
                    setTitle(text);
                    if (text.length > 0) {
                      setTitleError('');
                    }
                  } else {
                    setTitle('');
                  }
                }}
                maxLength={50}
                textStyle={styles.input}
                inputStyle={{
                  ...styles.inputContainer,
                  ...{
                    borderWidth: titleError !== '' ? 1 : 0,
                    borderColor: titleError !== '' ? colors.red : null,
                    marginBottom: titleError !== '' ? 6 : 20,
                  },
                }}
              />
              {titleError !== '' && (
                <Text style={styles.errorText}>{titleError}</Text>
              )}
              <TextInputComponent
                placeholder="Description"
                inputStyle={styles.inputContainer}
                placeholderTextColor={colors.gray}
                value={desc}
                onChangeText={text => {
                  if (text.trim().length) {
                    setDesc(text);
                  } else {
                    setDesc('');
                  }
                }}
                maxLength={300}
                textStyle={styles.input}
              />
              <TouchableOpacity
                style={[
                  styles.timeContainer,
                  {
                    borderWidth: timeError !== '' ? 1 : 0,
                    borderColor: timeError !== '' ? colors.red : null,
                    marginBottom: timeError !== '' ? 6 : 0,
                  },
                ]}
                activeOpacity={1}>
                <Text
                  style={[
                    styles.txt,
                    {
                      color: time !== '' ? colors.off_White : colors.gray,
                    },
                  ]}>
                  {time !== '' ? time : 'Time'}
                </Text>
                <TouchableOpacity
                  style={styles.timeIconContainer}
                  activeOpacity={0.8}
                  onPress={() => {
                    setTimeError('');
                    setShowTimeModal(!showTimeModal);
                  }}>
                  <Image
                    source={
                      showTimeModal
                        ? require('../../assets/todo/up-arrow.png')
                        : require('../../assets/todo/down-arrow.png')
                    }
                    style={styles.timeIcon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              {timeError !== '' && (
                <Text style={styles.errorText}>{timeError}</Text>
              )}
              {showTimeModal && (
                <View style={{alignItems: 'flex-end', paddingHorizontal: 16}}>
                  <TodoGetTimeListCompo
                    title="Part of the day"
                    onPress={() => {
                      setTime('Part of the day');
                      setShowTimeModal(false);
                    }}
                  />
                  <TodoGetTimeListCompo
                    title="Any time of day"
                    onPress={() => {
                      setTime('Any time of day');
                      setShowTimeModal(false);
                    }}
                  />
                  <TodoGetTimeListCompo
                    title="Morning"
                    onPress={() => {
                      setTime('Morning');
                      setShowTimeModal(false);
                    }}
                  />
                  <TodoGetTimeListCompo
                    title="Afternoon"
                    onPress={() => {
                      setTime('Afternoon');
                      setShowTimeModal(false);
                    }}
                  />
                  <TodoGetTimeListCompo
                    title="Evening"
                    onPress={() => {
                      setTime('Evening');
                      setShowTimeModal(false);
                    }}
                  />
                  <TodoGetTimeListCompo
                    title="At given time"
                    style={styles.removeBoder}
                    onPress={toggleTimePickerModal}
                  />
                  <DatePicker
                    modal
                    mode="time"
                    open={showTimePicker}
                    date={new Date()}
                    onConfirm={time => {
                      // let notifi_date = time.toLocaleDateString();
                      // let notifi_time = time.toLocaleTimeString();
                      setNotification(time);
                      let hours = time.getHours();
                      // console.log('hours is: ', hours);
                      // hours = hours % 12 || 12;
                      hours = hours % 24;

                      let amPm = hours < 12 ? 'AM' : 'PM';
                      hours = hours % 12 || 12;
                      // console.log('converted hour: ', hours);
                      let min = time.getMinutes();
                      let finalTime = `${pad(hours)}:${pad(min)} ${amPm}`;
                      setTime(finalTime);
                      setShowTimePicker(false);
                      setShowTimeModal(false);
                    }}
                    onCancel={() => setShowTimePicker(false)}
                  />
                </View>
              )}
              <View style={styles.notificationContainer}>
                <Text style={styles.notificationTxt}>Notification</Text>
                <Switch
                  value={showNotifi}
                  onValueChange={toggleSwitch}
                  trackColor={{
                    true: colors.yellow_light,
                    false: colors.gray_light,
                  }}
                  thumbColor={showNotifi ? colors.yellow : colors.gray}
                />
              </View>

              <ButtonComponent
                title="Save"
                onPress={handleAddNewTask}
                style={styles.btn}
                loading={loading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: colors.black_light,
    marginBottom: 20,
  },
  input: {
    color: colors.off_White,
    fontFamily: fontFamily.medium,
  },
  btn: {
    backgroundColor: colors.black_dark,
    marginTop: 40,
  },
  errorText: {
    fontSize: 12,
    color: colors.red,
    marginBottom: 20,
    paddingLeft: 4,
  },
  timeContainer: {
    backgroundColor: colors.black_light,
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingRight: 6,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    color: colors.gray,
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
  timeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: colors.off_White,
  },
  timeIconContainer: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  removeBoder: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  notificationTxt: {
    color: colors.off_White,
    fontFamily: fontFamily.semi_bold,
    fontSize: 16,
  },
  notificationContainer: {
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
