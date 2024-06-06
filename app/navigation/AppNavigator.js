import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import CustomDrawer from './CustomDrawer';
import CreateClientScreen from '../screens/CreateClientScreen';
import ClientDetailScreen from '../screens/ClientDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewTaskScreen from '../screens/FlatListTask/NewTaskScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CustomBottomTabBar from './CustomBottomTabBar';
import ChatWithAiScreen from '../screens/ChatWithAiScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerType="slide"
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: colors.transparent,
          drawerInactiveBackgroundColor: colors.transparent,
          drawerActiveTintColor: 'red',
          drawerInactiveTintColor: 'green',
          drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
          overlayColor: colors.transparent,
          drawerStyle: {
            backgroundColor: colors.primary,
            width: width * 0.7,
          },
          sceneContainerStyle: {
            backgroundColor: colors.transparent,
          },
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="MainScreens" component={MainScreens} />
      </Drawer.Navigator>
    </>
  );
};

const MainScreens = props => (
  <ScreenContainer>
    <CustomBottomTabBar {...props} />
  </ScreenContainer>
);

const ScreenContainer = ({children}) => (
  <View style={styles.container}>
    <View style={styles.topBlueColor} />
    {children}
  </View>
);

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
        name="ChatWithAiScreen"
        component={ChatWithAiScreen}
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
        name="NewTaskScreen"
        component={NewTaskScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topBlueColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.2,
    backgroundColor: colors.primary,
    zIndex: 1,
  },
});

export default AppNavigator;
