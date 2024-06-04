import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../../config/colors';
import fontFamily from '../../../config/fontFamily';

const ShowTodoItemCompo = ({data, index}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text numberOfLines={2} style={styles.titleTxt}>
        {data?.title}
      </Text>
      <Text style={styles.timeTxt}>{data?.time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black_light,
    marginBottom: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  titleTxt: {
    fontSize: 14,
    color: colors.off_White,
    fontFamily: fontFamily.semi_bold,
  },
  timeTxt: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    position: 'absolute',
    bottom: 6,
    right: 12,
    zIndex: 1,
  },
});

export default ShowTodoItemCompo;
