import {View, StyleSheet, Image, StatusBar} from 'react-native';
import React from 'react';
import colors from '../config/colors';

export default function SplashScreen() {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Image
          // source={require('../assets/app-logo.png')}
          source={require('../assets/todo/todo-logo.png')}
          style={styles.logoStyle}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: 140,
    height: 140,
    tintColor: colors.text_Input_Bg,
  },
});
