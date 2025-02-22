import React from 'react';
import { View } from 'react-native';
import { IRoundBoxProps } from './RoundBox.types';
import { Styles } from '../../assets/styles';

const RoundBox = ({ children, style }: IRoundBoxProps) => (
  <View style={[{ borderRadius: Styles.BORDER_RADIUS2 }, style]}>{children}</View>
);

export default RoundBox;
