import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../../components/ScreenComponent';
import colors from '../../config/colors';
import TodoTopHomeCompo from './components/TodoTopHomeCompo';
import {useNavigation} from '@react-navigation/native';

export default function TodoHomeScreen() {
  const navigation = useNavigation();
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
          <Text style={{color: colors.white}}>This is Home screen</Text>
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
