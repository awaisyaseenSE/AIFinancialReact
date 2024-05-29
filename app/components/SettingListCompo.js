import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';

const SettingListCompo = ({
  title = '',
  icon,
  onPress,
  isSwitch = false,
  switchEnable,
  toggleSwitch,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
      {isSwitch && (
        <Switch
          value={switchEnable}
          onValueChange={toggleSwitch}
          trackColor={{true: colors.primary, false: colors.white}}
          thumbColor={switchEnable ? colors.white : colors.off_White}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text_Input_Bg,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
});

export default SettingListCompo;
