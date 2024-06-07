import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from './app/screens/SplashScreen';
import MainNavigator from './app/navigation/MainNavigator';
import TodoNavigator from './app/screens/Todo/TodoNavigator';
import AuthsContext from './app/auth/AuthsContext';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // other
  //   checkUser();
  //   checkSplashDone();
  // }, []);

  // const checkUser = () => {
  //   if (auth().currentUser !== null && auth().currentUser !== undefined) {
  //     setUser(auth().currentUser);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      setSplashDone(true);
    }, 2000);
  }, []);

  // const checkSplashDone = () => {
  //   setTimeout(() => {
  //     setSplashDone(true);
  //   }, 2000);
  // };

  return <>{splashDone ? <TodoNavigator /> : <SplashScreen />}</>;

  // return <>{splashDone ? <MainNavigator /> : <SplashScreen />}</>;

  // return (
  //   <>
  //     {splashDone ? (
  //       <AuthsContext.Provider value={{user, setUser}}>
  //         <NavigationContainer>
  //           {user !== null ? <AppNavigator /> : <AuthNavigator />}
  //         </NavigationContainer>
  //       </AuthsContext.Provider>
  //     ) : (
  //       <SplashScreen />
  //     )}
  //   </>
  // );
}
