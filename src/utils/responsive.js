import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
