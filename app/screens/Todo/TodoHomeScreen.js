import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
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

export default function TodoHomeScreen() {
  const navigation = useNavigation();
  const [todoData, setTodoData] = useState([]);
  const [todayTodoItems, setTodayTodoItems] = useState([]);
  const [todayPercentage, setTodayPercentage] = useState(0);
  const isFocused = useIsFocused();
  const [totalStreasks, setTotalStreasks] = useState(0);

  let currentDate = new Date();
  let todayDate = currentDate.toLocaleDateString();

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleCalculateStreaks = async (no, allTasks) => {
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

    let preDayPercentage = (preDayCompletedTask / preDayAllTasks) * 100;
    preDayPercentage = parseInt(preDayPercentage.toFixed(0));
    let preDayStreakVal = 0;

    if (preDayPercentage) {
      if (preDayPercentage == 100) {
        preDayStreakVal = 1;
      } else {
        preDayStreakVal = 0;
      }
    } else {
      preDayStreakVal = 0;
    }

    // console.log('hello today streak is: ', no);
    // console.log('Pre day streak value is: ', preDayStreakVal);

    try {
      let key = 'streaks';
      let res = await AsyncStorage.getItem(key);
      let val = JSON.parse(res);
      let streaksValue = 0;
      if (val) {
        if (no == 1 && preDayStreakVal == 0) {
          streaksValue = 1;
        } else if (no == 1 && preDayStreakVal == 1) {
          streaksValue = val + 1;
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

      // console.log('streaks value final is: ', streaksValue);
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
    let percentage = (completedTasks / totalTasks) * 100;
    // console.log('Total task: ', totalTasks);
    // console.log('completed tasks: ', completedTasks);
    // console.log('percentage: ', percentage);
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
          <View style={{flex: 1}}>
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
