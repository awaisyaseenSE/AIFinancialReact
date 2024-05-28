import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';

export default function CreateClientScreen() {
  return (
    <>
      <ScreenComponent style={{backgroundColor: colors.white}}>
        <View>
          <Text>CreateClientScreen</Text>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
