import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../utils/theme';

export default function GlowCard({
  children,
  style,
  onPress,
  glowColor = COLORS.primary,
  noPad = false,
  disabled = false,
}) {
  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress
    ? { onPress, activeOpacity: 0.8, disabled }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      style={[
        styles.card,
        {
          shadowColor: glowColor,
          borderColor: glowColor + '55',
        },
        noPad && { padding: 0 },
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});
