import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import fontFamily from '../config/fontFamily';
import colors from '../config/colors';
import SettingListCompo from '../components/SettingListCompo';

export default function SettingScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      <ScreenComponent>
        <View style={styles.container}>
          <Text style={styles.heading}>Setting</Text>
          <SettingListCompo
            title="Support"
            icon={require('../assets/mic.png')}
          />
          <SettingListCompo
            title="Privacy and policy"
            icon={require('../assets/privacy.png')}
          />
          <SettingListCompo
            title="Notification"
            icon={require('../assets/notification.png')}
            isSwitch={true}
            switchEnable={isEnabled}
            toggleSwitch={toggleSwitch}
          />
          <SettingListCompo
            title="Upgrade Password"
            icon={require('../assets/lock.png')}
          />
          <SettingListCompo
            title="Language"
            icon={require('../assets/lang.png')}
          />
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    color: colors.black,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
});
