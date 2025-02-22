import { TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { DimensionValue, ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Colors } from '../assets/colors';
import { Styles } from '../assets/styles';

interface TouchButtonProps {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  onPress: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  children?: React.ReactNode;
}

export const TouchButton = ({ width = '100%', height = '100%', onPress, style, children }: TouchButtonProps) => (
  <TouchableOpacity
    style={[
      {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BUTTON_BACKGROUND1,
        borderRadius: Styles.BORDER_RADIUS2,
      },
      style,
    ]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
