import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/colors';

const TextInputComponent = ({
  value = '',
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  onPressSecure = () => {},
  secureText = '',
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = colors.grey,
  clearIcon = '',
  onPressClear = () => {},
  closeIconStyle,
  leftIcon,
  leftIconStyle,
  onPress,
  loading = false,
  innerRef,
  ...props
}) => {
  return (
    <View style={{...styles.inputStyle, ...inputStyle}}>
      {leftIcon && (
        <TouchableOpacity
          style={styles.leftIconContainer}
          onPress={onPress}
          activeOpacity={0.6}>
          <Image
            source={leftIcon}
            style={{...styles.leftIcon, ...leftIconStyle}}
          />
        </TouchableOpacity>
      )}
      <TextInput
        ref={innerRef}
        style={{...styles.textStyle, ...textStyle}}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onPressSecure={onPressSecure}
        {...props}
      />
      {!!secureText ? (
        <TouchableOpacity onPress={onPressSecure} activeOpacity={0.6}>
          <Image source={secureText} style={styles.showHideIcon} />
        </TouchableOpacity>
      ) : null}
      {clearIcon.length > 0 ? (
        <TouchableOpacity
          onPress={onPressClear}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 4,
          }}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.black} />
          ) : (
            <Image
              source={require('../assets/close.png')}
              style={{...styles.closeIcon, ...closeIconStyle}}
            />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: colors.text_Input_Bg,
  },
  textStyle: {
    fontSize: 14,
    flex: 1,
    color: colors.black_light,
    marginRight: 12,
    height: '100%',
  },
  showHideIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.black_light,
  },
  closeIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: colors.black_light,
  },
  leftIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.black_light,
    marginRight: 12,
  },
  leftIconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextInputComponent;
