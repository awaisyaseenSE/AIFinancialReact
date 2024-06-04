import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import {useNavigation} from '@react-navigation/native';
import TodoTopHomeCompo from './components/TodoTopHomeCompo';
import colors from '../../config/colors';

export default function TodoAddTaskScreen() {
  const navigation = useNavigation();
  return (
    <>
      <ScreenComponent
        style={{backgroundColor: colors.primary}}
        content={'light-content'}>
        <TodoTopHomeCompo
          title="Add Task"
          onPress={() => navigation.openDrawer()}
        />
        <View style={styles.container}>
          <Text style={{color: colors.white}}>This is Add new task screen</Text>
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
});
