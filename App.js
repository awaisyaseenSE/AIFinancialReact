import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from './app/screens/SplashScreen';
import MainNavigator from './app/navigation/MainNavigator';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSplashDone(true);
    }, 2000);
  }, []);

  return <>{splashDone ? <MainNavigator /> : <SplashScreen />}</>;
}
