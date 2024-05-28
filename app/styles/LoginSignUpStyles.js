import {Platform, StyleSheet} from 'react-native';
import colors from '../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  mainContainer: {
    flex: 0.7,
    backgroundColor: colors.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: Platform.OS === 'ios' ? 20 : 6,
  },
  heading: {
    fontSize: 22,
    color: colors.black,
    fontWeight: '600',
  },
  subHeading: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
    marginTop: 2,
    marginBottom: 30,
  },
  labelStyle: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  forgotTxt: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
  forgotTxtContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  btn: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 30,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footerTxt: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '700',
    paddingVertical: 4,
  },
  errorText: {
    fontSize: 12,
    color: colors.red,
    marginBottom: 10,
    paddingLeft: 4,
  },
});
