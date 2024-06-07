import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import colors from '../../config/colors';
import TodoTopHomeCompo from './components/TodoTopHomeCompo';
import CalendarStrip from 'react-native-calendar-strip';
import {getStoredTodoData} from '../../utils/storageUtils';
import ShowTodoItemCompo from './components/ShowTodoItemCompo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function TodoAllTaskScreen() {
  const navigation = useNavigation();
  const [todoData, setTodoData] = useState([]);
  const [todoTodayData, setTodoTodayData] = useState([]);
  const [isCurrentDay, setIsCurrentDay] = useState(true);

  const isFocused = useIsFocused();
  let currentDate = new Date();

  let currentYear = currentDate.getFullYear();
  let currentDatee = currentDate.getDate();
  let currentMonth = currentDate.getMonth();

  let fullCurrentDate = {
    year: currentYear,
    month: currentMonth,
    date: currentDatee,
  };

  //   console.log(currentMonth);

  const [selectedDate, setSelectedDate] = useState(fullCurrentDate);

  const isSameCurrentDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.year === date2.getFullYear() &&
      date1.month === date2.getMonth() &&
      date1.date === date2.getDate()
    );
  };

  const getTodoData = async () => {
    setIsCurrentDay(isSameDay(selectedDate, currentDate));
    try {
      const currentDate = new Date();
      let data = await getStoredTodoData();
      if (data && data.length > 0) {
        const todayItems = data.filter(item => {
          const itemDate = new Date(item.date);
          return isSameDay(selectedDate, itemDate);
        });

        // console.log('items is: ', todayItems.length);
        if (todayItems.length > 0) {
          const currenttodayItems = todayItems.filter(item => {
            // if (!JSON.parse(item.done)) {
            //   if (!JSON.parse(item.skip)) {
            //     const itemDate = new Date(item.date);
            //     return isSameCurrentDay(currentDate, itemDate);
            //   }
            // }
            const itemDate = new Date(item.date);
            return isSameCurrentDay(currentDate, itemDate);
          });

          if (currenttodayItems.length > 0) {
            const newArr = currenttodayItems.map(v => ({...v, opened: false}));
            newArr.sort((a, b) => b.id - a.id);
            setTodoTodayData(newArr);
          } else {
            setTodoTodayData([]);
          }

          setTodoData(todayItems);

          //   console.log('current day items: ', currenttodayItems.length);
        } else {
          setTodoData([]);
        }
      }
    } catch (error) {
      console.log('Error while getting todo data in todo-home screen: ', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTodoData();
    }
  }, [selectedDate, isFocused]);

  const openSwiper = ind => {
    let temArr = todoData;
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
    setTodoData(temp);
  };

  const onDoneTodo = async id => {
    try {
      let res = await getStoredTodoData();
      if (res && res.length > 0) {
        const indexToUpdate = res.findIndex(item => item.id === id);

        if (indexToUpdate !== -1) {
          res[indexToUpdate].done = JSON.stringify(true);
          await AsyncStorage.setItem('todoItems', JSON.stringify(res));
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
          title="All Tasks"
          onPress={() => navigation.openDrawer()}
        />
        <View style={styles.container}>
          <CalendarStrip
            numDaysInWeek={7}
            selectedDate={new Date()}
            style={{
              height: 70,
              backgroundColor: colors.gray,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
            dateNumberStyle={{color: colors.white}}
            dateNameStyle={{color: colors.white}}
            onDateSelected={d => {
              let fullDate = {
                year: d.year(),
                month: d.month(),
                date: d.date(),
              };
              setSelectedDate(fullDate);
            }}
          />
          <View style={{marginTop: 20}}>
            <FlatList
              data={isCurrentDay ? todoTodayData : todoData}
              renderItem={({item, index}) => (
                <ShowTodoItemCompo
                  data={item}
                  index={index}
                  openSwiper={openSwiper}
                  onDoneTodo={onDoneTodo}
                  onSkipTodo={onSkipTodo}
                  onMoveToNextDayTodo={onMoveToNextDayTodo}
                  showLeft={isCurrentDay ? true : false}
                  isSwiperClose={false}
                  showSkip={isCurrentDay ? true : false}
                  showMoveToNext={isCurrentDay ? true : false}
                />
              )}
              // showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => {
              let n = new Date(
                selectedDate.year,
                selectedDate.month,
                selectedDate.date,
              );
              let selectedFinalDate = n.toDateString();

              let isToday = isSameDay(selectedDate, currentDate);
              //   console.log('is selected date is today: ', isToday);

              const itemDate = new Date(selectedFinalDate);
              let isFuture = itemDate > currentDate;

              //   console.log('is future is: ', isFuture);

              if (isFuture || isToday) {
                let tit = isFuture
                  ? 'Add Task for Future'
                  : isToday
                  ? 'Add Today Task'
                  : null;
                navigation.navigate('TodoAddAllItemScreen', {
                  taskTitle: tit,
                  taskDate: selectedFinalDate,
                });
              }

              //   let fff = moment('2020.01.01', 'YYYY.MM.DD').fromNow();
              //   console.log(fff);
              //   navigation.navigate('TodoAddAllItemScreen');
            }}>
            <Image
              source={require('../../assets/ic_plus.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
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
  addBtn: {
    width: 44,
    height: 44,
    backgroundColor: colors.yellow,
    borderRadius: 22,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 12 : 2,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: colors.black,
    resizeMode: 'contain',
  },
});
