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
        console.log('All todo items data is: ', data.length);

        const todayItems = data.filter(item => {
          const itemDate = new Date(item.date);
          return isSameDay(currentDate, itemDate);
        });

        console.log('today items is: ', todayItems.length);
        setTodayTodoItems(todayItems);
      }
    } catch (error) {
      console.log('Error while getting todo data in todo-home screen: ', error);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  const handleDelete = async () => {
    await handleDeleteAllStorageData();
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
                <ShowTodoItemCompo data={item} index={index} />
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
