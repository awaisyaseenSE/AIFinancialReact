import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import AuthsContext from '../auth/AuthsContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

function MainNavigator(props) {
  const [user, setUser] = useState(null);

  const checkUser = () => {
    if (auth().currentUser !== null && auth().currentUser !== undefined) {
      setUser(auth().currentUser);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthsContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        {/* {user !== null ? <AppNavigator /> : <AuthNavigator />} */}
        {auth()?.currentUser ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthsContext.Provider>
  );
}

export default MainNavigator;
