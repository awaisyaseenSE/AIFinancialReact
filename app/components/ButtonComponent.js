import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';

const ButtonComponent = ({
  title = '',
  style,
  onPress,
  textStyle,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.buttonContainer, ...style}}
      activeOpacity={0.5}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size={16} color={colors.white} />
      ) : (
        <Text style={{...styles.buttonText, ...textStyle}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    height: 54,
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
  },
});

export default ButtonComponent;
