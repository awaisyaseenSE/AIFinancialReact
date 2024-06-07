import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const AiPlanListItemCompo = ({title = '', desc = ''}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require('../assets/privacy.png')} />
      <View style={styles.content}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.des}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  content: {
    marginLeft: 12,
  },
  heading: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  des: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    marginTop: 6,
    lineHeight: 18,
  },
});

export default AiPlanListItemCompo;
