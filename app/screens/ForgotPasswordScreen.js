import {View, Text} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import TodoTopHomeCompo from './Todo/components/TodoTopHomeCompo';
import TopCompoWithHeading from '../components/TopCompoWithHeading';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  return (
    <>
      <ScreenComponent content="light-content">
        <View>
          <Text
            style={{marginTop: 20, paddingHorizontal: 20, color: colors.white}}>
            ForgotPasswordScreen
          </Text>
        </View>
      </ScreenComponent>
    </>
  );
}
