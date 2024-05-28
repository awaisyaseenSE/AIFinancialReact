import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';

export default function ScreenComponent({
  style,
  children,
  backgroundColor = 'black',
  content = Platform.OS === 'ios' ? 'dark-content' : 'light-content',
  hideStatusBar = false,
}) {
  return (
    <>
      <StatusBar
        barStyle={content}
        backgroundColor={backgroundColor}
        hidden={hideStatusBar}
      />
      {Platform.OS === 'ios' ? (
        <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
      ) : (
        <View style={[styles.screen, style]}>{children}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 5 : 0,
    backgroundColor: colors.white,
  },
});
