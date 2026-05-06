import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled,
  style,
  textStyle,
}: AppButtonProps) {
  const textColor = variant === "secondary" ? "#1e293b" : "#ffffff";

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#1d4ed8",
  },
  secondary: {
    backgroundColor: "#e2e8f0",
  },
  danger: {
    backgroundColor: "#dc2626",
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});
