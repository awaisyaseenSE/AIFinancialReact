import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import colors from '../../config/colors';
import TodoTopHomeCompo from './components/TodoTopHomeCompo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getStoredTodoData} from '../../utils/storageUtils';
import ShowTodoItemCompo from './components/ShowTodoItemCompo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import fontFamily from '../../config/fontFamily';
import notifee, {
  TimestampTrigger,
  TriggerType,
  TimeUnit,
  AndroidImportance,
} from '@notifee/react-native';

export default function TodoHomeScreen() {
  const navigation = useNavigation();
  const [todoData, setTodoData] = useState([]);
  const [todayTodoItems, setTodayTodoItems] = useState([]);
  const [todayPercentage, setTodayPercentage] = useState(0);
  const isFocused = useIsFocused();
  const [totalStreasks, setTotalStreasks] = useState(0);

  let currentDate = new Date();
  let todayDate = currentDate.toLocaleDateString();

  const handleShowNofi = async () => {
    const secondsInFuture = 10; // Delay in seconds before the notification is triggered
    const scheduleTime = new Date(Date.now() + secondsInFuture * 1000);

    try {
      if (Platform.OS === 'ios') {
        await notifee.requestPermission();
      }

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default2',
        name: 'Default Channel2',
        importance: AndroidImportance.HIGH,
      });

      // Display a notification
      // await notifee.displayNotification({
      //   title: 'Todo APP',
      //   body: 'Your task time is start harry up!',
      //   android: {
      //     channelId,
      //     smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      //     // pressAction is needed if you want the notification to open the app when pressed
      //     pressAction: {
      //       id: 'default',
      //     },
      //   },
      // });
      const date = new Date(Date.now());
      date.setHours(16);
      date.setMinutes(54);

      console.log('time is: ', date.getTime());
      // Create a time-based trigger
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          title: 'Meeting with Jane',
          body: 'Today at 11:20am',
          android: {
            channelId: channelId,
          },
        },
        trigger,
      );
    } catch (error) {
      console.log('Error in noitification show: ', error);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleCalculateStreaks = async (no, allTasks) => {
    const reducedArray = allTasks.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;

      if (accHasContent && acc[lastItemIndex].date == next.date) {
        acc[lastItemIndex].title += next.title;
      } else {
        // first time seeing this entry. add it!
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);

    console.log('lsfklslfslk  Reduce array: ', reducedArray.length);

    /////////

    // console.log('');
    // console.log('');
    let preDay = new Date();
    preDay.setDate(preDay.getDate() - 1);

    const preDayAllTasks = allTasks.filter(item => {
      if (!JSON.parse(item.skip)) {
        const itemDate = new Date(item.date);
        return isSameDay(preDay, itemDate);
      }
    });

    const preDayCompletedTask = allTasks.filter(item => {
      if (JSON.parse(item.done)) {
        const itemDate = new Date(item.date);
        return isSameDay(preDay, itemDate);
      }
    });

    if (Platform.OS == 'android') {
      // console.log('previous day all task: ', preDayAllTasks.length);
      // console.log('previous day completed task: ', preDayCompletedTask.length);
    }

    // let preDayPercentage = (preDayCompletedTask / preDayAllTasks) * 100;
    // preDayPercentage = parseInt(preDayPercentage.toFixed(0));

    let preDayPercentage =
      preDayAllTasks.length == preDayCompletedTask.length ? true : false;
    // console.log('preDayPercentage: ', preDayPercentage);
    let preDayStreakVal = 0;

    // if (preDayPercentage) {
    //   if (preDayPercentage == 100) {
    //     preDayStreakVal = 1;
    //   } else {
    //     preDayStreakVal = 0;
    //   }
    // } else {
    //   preDayStreakVal = 0;
    // }

    if (preDayPercentage) {
      preDayStreakVal = 1;
      console.log('object:::');
    } else {
      preDayStreakVal = 0;
    }

    console.log('preDayStreakVal: ', preDayStreakVal);
    // console.log('hello today streak is: ', no);
    // console.log('Pre day streak value is: ', preDayStreakVal);

    try {
      let key = 'streaks';
      let res = await AsyncStorage.getItem(key);
      let val = JSON.parse(res);
      let streaksValue = 0;
      if (val !== null) {
        console.log('lllll', no);
        if (no == 1 && preDayStreakVal == 0) {
          streaksValue = 1;
        } else if (no == 1 && preDayStreakVal == 1) {
          // streaksValue = val + 1;
          streaksValue = 1 + 1;
        } else if (no == 0 && preDayStreakVal == 1) {
          streaksValue = 1;
        } else {
          streaksValue = 0;
        }
      } else {
        if (no == 1) {
          streaksValue = 1;
        } else {
          streaksValue = 0;
        }
      }

      console.log('streaks value final is: ', streaksValue);
      setTotalStreasks(streaksValue);
      await AsyncStorage.setItem(key, JSON.stringify(streaksValue));
    } catch (error) {
      console.log(
        'Error while getting and storing streaks value in async storage: ',
        error,
      );
    }
  };

  const checkTodayCompleteTask = allTasks => {
    const currentDate = new Date();

    const todayAllItems = allTasks.filter(item => {
      if (!JSON.parse(item.skip)) {
        const itemDate = new Date(item.date);
        return isSameDay(currentDate, itemDate);
      }
    });

    const todayCompletedItems = allTasks.filter(item => {
      if (JSON.parse(item.done)) {
        const itemDate = new Date(item.date);
        return isSameDay(currentDate, itemDate);
      }
    });

    let completedTasks = todayCompletedItems?.length;
    let totalTasks = todayAllItems?.length;
    let percentage = (completedTasks / totalTasks) * 100 || 0;
    if (Platform.OS == 'android') {
      console.log('Total task: ', totalTasks);
      console.log('completed tasks: ', completedTasks);
      console.log('percentage: ', percentage);
    }
    setTodayPercentage(parseInt(percentage.toFixed(0)));

    if (parseInt(percentage.toFixed(0)) == 100) {
      handleCalculateStreaks(1, allTasks);
    } else {
      handleCalculateStreaks(0, allTasks);
    }
  };

  const getTodoData = async () => {
    try {
      const currentDate = new Date();
      let data = await getStoredTodoData();
      if (data && data.length > 0) {
        const todayItems = data.filter(item => {
          if (!JSON.parse(item.done)) {
            if (!JSON.parse(item.skip)) {
              const itemDate = new Date(item.date);
              return isSameDay(currentDate, itemDate);
            }
          }
        });
        if (todayItems.length > 0) {
          const newArr = todayItems.map(v => ({...v, opened: false}));
          newArr.sort((a, b) => b.id - a.id);
          setTodayTodoItems(newArr);
        } else {
          setTodayTodoItems([]);
        }
        checkTodayCompleteTask(data);
      }
    } catch (error) {
      console.log('Error while getting todo data in todo-home screen: ', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTodoData();
    }
  }, [isFocused]);

  const openSwiper = ind => {
    let temArr = todayTodoItems;
    temArr.map((item, index) => {
      if (index == ind) {
        item.opened = true;
      } else {
        item.opened = false;
      }
    });

    let temp = [];
    temArr.map(item => {
      temp.push(item);
    });
    // setTodoData(temp);
    setTodayTodoItems(temp);
  };

  const onDoneTodo = async id => {
    try {
      // console.log('item is done: ', id);
      let res = await getStoredTodoData();
      if (res && res.length > 0) {
        const indexToUpdate = res.findIndex(item => item.id === id);

        if (indexToUpdate !== -1) {
          res[indexToUpdate].done = JSON.stringify(true);
          await AsyncStorage.setItem('todoItems', JSON.stringify(res));
          // console.log('object:::::::::');
          getTodoData();
        }
      }
    } catch (error) {
      console.log('Error while updating on done status of todo task: ', error);
    }
  };

  const onSkipTodo = async id => {
    try {
      // console.log('item is skip: ', id);
      let res = await getStoredTodoData();
      if (res && res.length > 0) {
        const indexToUpdate = res.findIndex(item => item.id === id);

        if (indexToUpdate !== -1) {
          res[indexToUpdate].skip = JSON.stringify(true);
          await AsyncStorage.setItem('todoItems', JSON.stringify(res));

          getTodoData();
        }
      }
    } catch (error) {
      console.log('Error while updating on done status of todo task: ', error);
    }
  };

  const onMoveToNextDayTodo = async itm => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let finaldate = tomorrow.toDateString();

    try {
      let id = itm?.id;
      let res = await getStoredTodoData();
      if (res && res.length > 0) {
        const indexToUpdate = res.findIndex(item => item.id === id);

        if (indexToUpdate !== -1) {
          res[indexToUpdate].date = finaldate;
          await AsyncStorage.setItem('todoItems', JSON.stringify(res));
        }
        getTodoData();
      }
    } catch (error) {
      console.log('Error while moving current todo task to next day: ', error);
    }
  };

  const checkNotificationAndriodBattery = async () => {
    if (Platform.OS === 'android') {
      const batteryOptimizationEnabled =
        await notifee.isBatteryOptimizationEnabled();
      if (batteryOptimizationEnabled) {
        // 2. ask your users to disable the feature
        Alert.alert(
          'Restrictions Detected',
          'To ensure notifications are delivered, please disable battery optimization for the app.',
          [
            // 3. launch intent to navigate the user to the appropriate screen
            {
              text: 'OK, open settings',
              onPress: async () =>
                await notifee.openBatteryOptimizationSettings(),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  useEffect(() => {
    checkNotificationAndriodBattery();
  }, []);

  return (
    <>
      <ScreenComponent
        style={{backgroundColor: colors.primary}}
        content={'light-content'}>
        <TodoTopHomeCompo
          title="Home"
          onPress={() => navigation.openDrawer()}
        />
        <View style={styles.container}>
          <Text style={styles.heading}>{todayDate}</Text>
          <View style={{flex: todayTodoItems.length > 2 ? 1 : 0}}>
            <FlatList
              data={todayTodoItems}
              renderItem={({item, index}) => (
                <ShowTodoItemCompo
                  data={item}
                  index={index}
                  openSwiper={openSwiper}
                  onDoneTodo={onDoneTodo}
                  onSkipTodo={onSkipTodo}
                  onMoveToNextDayTodo={onMoveToNextDayTodo}
                />
              )}
              // showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{marginTop: 14}}>
            <View style={styles.productivityContainer}>
              <Text style={styles.h2}>Productivity</Text>
              <View style={{alignItems: 'center', marginTop: 12}}>
                <AnimatedCircularProgress
                  size={200}
                  width={16}
                  fill={todayPercentage}
                  tintColor={colors.green}
                  backgroundColor={colors.black_dark}
                  arcSweepAngle={180}
                  rotation={270}
                  children={() => (
                    <View style={{marginBottom: 24}}>
                      <Text style={styles.h1}>{todayPercentage}%</Text>
                    </View>
                  )}
                />
                <TouchableOpacity
                  style={styles.taskCompleteBtn}
                  activeOpacity={1}>
                  <Text style={styles.taskCompleteBtnTxt}>Task completed</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.productivityContainer, {marginTop: 14}]}>
              <Text style={styles.h2}>Streaks</Text>
              <View
                style={{alignItems: 'center', marginTop: 10, marginBottom: 16}}>
                <Text style={styles.h1}>{totalStreasks} Days</Text>
                <Text style={styles.lightTxt}>Current Streaks</Text>
              </View>
              <View style={styles.box}>
                <Text
                  style={[
                    styles.lightTxt,
                    {marginTop: 0, fontSize: 16, lineHeight: 20},
                  ]}>
                  for this part just write "complete all your habits and tasks
                  to have a streak".
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: Platform.OS === 'android' ? 12 : 0,
  },
  heading: {
    fontSize: 18,
    color: colors.white,
    alignSelf: 'center',
    marginBottom: 14,
  },
  h1: {
    fontSize: 22,
    color: colors.white,
    fontFamily: fontFamily.bold,
  },
  h2: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
  },
  productivityContainer: {
    backgroundColor: colors.black_light,
    paddingHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 16,
  },
  taskCompleteBtn: {
    marginTop: -90,
    backgroundColor: colors.gray_light,
    width: '86%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  taskCompleteBtnTxt: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
  },
  lightTxt: {
    marginTop: 10,
    fontSize: 14,
    color: colors.gray_light,
    fontFamily: fontFamily.medium,
  },
  box: {
    backgroundColor: colors.black_dark,
    opacity: 0.9,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 8,
  },
});
