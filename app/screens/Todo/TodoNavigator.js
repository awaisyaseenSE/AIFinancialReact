import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions, Platform} from 'react-native';
import TodoHomeScreen from './TodoHomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import TodoCustomDrawer from './components/TodoCustomDrawer';
import TodoAddTaskScreen from './TodoAddTaskScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');

const DrawerNavigator = () => {
  return (
    <>
      <Drawer.Navigator
        drawerType="slide"
        screenOptions={{
          drawerStyle: {
            width: width * 0.7,
            alignSelf: 'center',
          },
          sceneContainerStyle: {
            backgroundColor: '#FFFFFF33',
          },
          swipeEdgeWidth: Platform.OS === 'android' && 100,
          headerShown: false,
          drawerPosition: 'left',
        }}
        drawerContent={props => <TodoCustomDrawer {...props} />}>
        <Drawer.Screen
          name="TodoHomeScreen"
          component={TodoHomeScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="TodoAddTaskScreen"
          component={TodoAddTaskScreen}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </>
  );
};

function TodoNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainRoutes"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default TodoNavigator;
