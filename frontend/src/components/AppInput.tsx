import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string | null;
}

export default function AppInput({ label, error, style, ...props }: AppInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor="#94a3b8"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontWeight: "600",
    color: "#0f172a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  error: {
    color: "#b91c1c",
    fontSize: 12,
  },
});
