import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import ChatWithAiScreen from '../screens/ChatWithAiScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions, Platform} from 'react-native';
import colors from '../config/colors';
import CustomDrawer from './CustomDrawer';
import CreateClientScreen from '../screens/CreateClientScreen';
import ClientDetailScreen from '../screens/ClientDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Animated from 'react-native-reanimated';
import FlatListTaskScreen from '../screens/FlatListTaskScreen';
import NewTaskScreen from '../screens/FlatListTask/NewTaskScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerType="slide"
        // initialRouteName="TabRoutes"
        // screenOptions={{
        //   headerShown: false,
        //   drawerPosition: 'left',
        //   drawerActiveBackgroundColor: 'transparent',
        //   drawerInactiveBackgroundColor: 'transparent',
        // }}
        screenOptions={{
          drawerStyle: {
            width: width * 0.7,
            alignSelf: 'center',
          },
          sceneContainerStyle: {
            // backgroundColor: '#FFFFFF33',
            backgroundColor: colors.gray_light,
          },
          swipeEdgeWidth: Platform.OS === 'android' && 100,
          headerShown: false,
          drawerPosition: 'left',
          drawerActiveBackgroundColor: 'transparent',
          drawerInactiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'red',
          drawerInactiveTintColor: 'green',
          overlayColor: 'transparent',
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </>
  );
};

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainRoutes"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateClientScreen"
        component={CreateClientScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ClientDetailScreen"
        component={ClientDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FlatListTaskScreen"
        component={FlatListTaskScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewTaskScreen"
        component={NewTaskScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default AppNavigator;
