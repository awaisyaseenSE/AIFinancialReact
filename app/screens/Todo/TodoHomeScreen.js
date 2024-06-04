import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import colors from '../../config/colors';
import TodoTopHomeCompo from './components/TodoTopHomeCompo';
import {LinkingContext, useNavigation} from '@react-navigation/native';
import {
  getStoredTodoData,
  handleDeleteAllStorageData,
} from '../../utils/storageUtils';
import ShowTodoItemCompo from './components/ShowTodoItemCompo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoHomeScreen() {
  const navigation = useNavigation();
  const [todoData, setTodoData] = useState([]);
  const [todayTodoItems, setTodayTodoItems] = useState([]);

  let currentDate = new Date();
  let todayDate = currentDate.toLocaleDateString();

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getTodoData = async () => {
    try {
      const currentDate = new Date();
      let data = await getStoredTodoData();
      if (data && data.length > 0) {
        // console.log('All todo items data is: ', data.length);

        const todayItems = data.filter(item => {
          if (!JSON.parse(item.done)) {
            if (!JSON.parse(item.skip)) {
              const itemDate = new Date(item.date);
              return isSameDay(currentDate, itemDate);
            }
          }
        });

        // console.log('today items is: ', todayItems.length);
        if (todayItems.length > 0) {
          const newArr = todayItems.map(v => ({...v, opened: false}));
          setTodayTodoItems(newArr);
        }
      }
    } catch (error) {
      console.log('Error while getting todo data in todo-home screen: ', error);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

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
    setTodoData(temp);
  };

  const onDoneTodo = async id => {
    try {
      console.log('item is done: ', id);
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
      console.log('item is skip: ', id);
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
          getTodoData();
        }
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
          <View>
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
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Text style={{color: colors.white}}>Todo Items</Text>
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
    marginBottom: 20,
  },
});
