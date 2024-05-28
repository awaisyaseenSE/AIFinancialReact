import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const TopHomeScreenCompo = ({onPressLeft, onPressRight}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPressLeft}>
        <Image
          source={require('../assets/drawer-icon.png')}
          style={styles.lefticon}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Home</Text>
      <View
        style={[styles.iconContainer, {alignItems: 'flex-end'}]}
        onPress={onPressRight}>
        <TouchableOpacity style={styles.rightIconContainer}>
          <Image
            source={require('../assets/notification-home.png')}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  lefticon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    width: '14%',
  },
  heading: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
  },
  rightIcon: {
    width: 30,
    height: 30,
  },
  rightIconContainer: {},
});

export default TopHomeScreenCompo;
