import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import FastImage from 'react-native-fast-image';

export default function TestingScreen() {
  return (
    <>
      <ScreenComponent
        style={{backgroundColor: colors.gray_light}}
        // content={'light-content'}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Testing Screen</Text>
          <FastImage
            style={[
              styles.img,
              Platform.OS === 'android'
                ? {elevation: 10, shadowColor: 'red'}
                : {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    backgroundColor: colors.gray,
                  },
            ]}
            source={{
              uri: 'https://images.unsplash.com/photo-1717869885094-4a6f55df8154?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            // resizeMode="contain"
          />
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  heading: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  img: {
    height: undefined,
    width: '100%',
    aspectRatio: 2 / 3,
  },
});
