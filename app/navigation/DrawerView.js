import {StyleSheet, Platform, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';
import colors from '../config/colors';

const DrawerView = ({children}) => {
  const progress = useDrawerProgress();
  const {width} = useWindowDimensions();
  //   console.log(progress.value);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {
        scale: interpolate(progress.value, [0, 1], [1, 0.85], 'clamp'),
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [0, -10], 'clamp')}deg`,
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, Platform.OS === 'android' ? width - 130 : -60],
          'clamp',
        ),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 20], 'clamp'),
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default DrawerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray_light,
  },
});
