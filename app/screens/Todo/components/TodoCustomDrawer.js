import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View} from 'react-native';
import DrawerItemListCompo from '../../../navigation/DrawerItemListCompo';
import colors from '../../../config/colors';

function TodoCustomDrawer({navigation}) {
  return (
    <>
      <DrawerContentScrollView
        style={{
          backgroundColor: colors.primary,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginTop: 18}}>
          <DrawerItemListCompo
            image={require('../../../assets/home.png')}
            title="Home"
            iconStyle={{tintColor: colors.white}}
            txtStyle={{color: colors.white}}
            onPress={() => {
              navigation.navigate('TodoHomeScreen');
            }}
          />
          <DrawerItemListCompo
            image={require('../../../assets/todo/add.png')}
            title="Add Task"
            iconStyle={{tintColor: colors.white}}
            txtStyle={{color: colors.white}}
            onPress={() => {
              navigation.navigate('TodoAddTaskScreen');
            }}
          />
          <DrawerItemListCompo
            image={require('../../../assets/todo/add.png')}
            title="All Task"
            iconStyle={{tintColor: colors.white}}
            txtStyle={{color: colors.white}}
            onPress={() => {
              navigation.navigate('TodoAllTaskScreen');
            }}
          />
        </View>
      </DrawerContentScrollView>
    </>
  );
}

export default TodoCustomDrawer;
