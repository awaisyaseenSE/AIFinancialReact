import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import {useNavigation} from '@react-navigation/native';

const TopCompoWithHeading = ({
  title = '',
  onPress,
  rightIcon = '',
  onPressRight,
  rightIconStyle,
  style,
  titleStyle,
  backIconStyle,
  rightIconContainerStyle,
  loading = false,
  rightTxtStyle,
}) => {
  const navigation = useNavigation();
  if (!onPress) {
    onPress = () => navigation.goBack();
  }
  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
        }}
        onPress={onPress}>
        <Image
          source={require('../assets/back.png')}
          style={{...styles.backIcon, ...backIconStyle}}
        />
      </TouchableOpacity>
      <Text style={{...styles.text, ...titleStyle}}>{title}</Text>
      {rightIcon !== '' ? (
        <TouchableOpacity
          style={[styles.rightIconContainer, rightIconContainerStyle]}
          onPress={onPressRight}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={rightIcon}
              style={[styles.backIcon, rightIconStyle]}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIconContainer}>
          <View style={styles.backIcon} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    marginLeft: 12,
    color: colors.black,
  },
  righttext: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.blue,
  },
  rightIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

export default TopCompoWithHeading;
