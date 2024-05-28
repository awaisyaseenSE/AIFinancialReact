import {Dimensions, PixelRatio, Platform} from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const scale = width / 375;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const normalize = size => {
  const newSize = size * scale;
  return Platform.OS === 'ios'
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const getResponsivePadding = baseValue => {
  const responsiveValue = baseValue * scale;
  return normalize(responsiveValue);
};

export const getResponsiveMargin = baseValue => {
  const responsiveValue = baseValue * scale;
  return normalize(responsiveValue);
};

export const getFontSize = size => {
  const fontScale = PixelRatio.getFontScale();
  return size / fontScale;
};

export const getResponsiveWidth = percentage => {
  return (percentage / 100) * screenWidth;
};

export const getResponsiveHeight = percentage => {
  return (percentage / 100) * screenHeight;
};
