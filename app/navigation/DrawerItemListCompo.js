import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const DrawerItemListCompo = ({
  image,
  title = '',
  onPress,
  style,
  txtStyle,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.itemContainer, ...style}}
      activeOpacity={0.5}
      onPress={onPress}>
      <Image source={image} style={{...styles.iconStyle, ...iconStyle}} />
      <Text style={{...styles.textStyle, ...txtStyle}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  textStyle: {
    fontSize: 14,
    marginLeft: 12,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
});

export default DrawerItemListCompo;
