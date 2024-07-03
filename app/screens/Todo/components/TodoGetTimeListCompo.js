import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../config/colors';
import fontFamily from '../../../config/fontFamily';

const TodoGetTimeListCompo = ({title = '', onPress, style}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black_light,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bottom_Tab_Gray,
    width: '46%',
  },
  txt: {
    fontSize: 14,
    color: colors.gray_light,
    fontFamily: fontFamily.medium,
  },
});

export default TodoGetTimeListCompo;
