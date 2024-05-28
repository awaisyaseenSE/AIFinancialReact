import {View, StyleSheet, Platform, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import ChatWithAiScreen from '../screens/ChatWithAiScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.bottom_Tab_Gray,
        tabBarStyle: {
          backgroundColor: colors.white,
          position: 'absolute',
          bottom: Platform.OS === 'android' ? 0 : 0,
          paddingVertical: 4,
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: isIOS ? insets.bottom : 16,
          alignContent: 'center',
        },
      }}>
      <BottomTab.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            textAlign: 'center',
          },
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/home.png')}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.black : colors.bottom_Tab_Gray},
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        component={ChatWithAiScreen}
        name="ChatWithAiScreen"
        options={{
          tabBarLabel: '',

          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/bottom-tab-logo.png')}
                style={{width: 80, height: 80}}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        component={SettingScreen}
        name="SettingScreen"
        options={{
          tabBarLabel: 'Setting',
          tabBarLabelStyle: {textAlign: 'center'},
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/setting.png')}
                style={[
                  styles.iconStyle,
                  {tintColor: focused ? colors.black : colors.bottom_Tab_Gray},
                ]}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default BottomTabNavigator;
