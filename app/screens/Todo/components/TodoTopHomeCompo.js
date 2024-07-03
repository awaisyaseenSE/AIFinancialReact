import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../../../config/colors';
import fontFamily from '../../../config/fontFamily';

const TodoTopHomeCompo = ({title = '', onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        activeOpacity={0.6}
        onPress={onPress}>
        <Image
          source={require('../../../assets/drawer-icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.txt}>{title}</Text>
      <View style={styles.iconContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    marginBottom: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: colors.off_White,
  },
  iconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: '14%',
  },
  txt: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    color: colors.off_White,
  },
});

export default TodoTopHomeCompo;
