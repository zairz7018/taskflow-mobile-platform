import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

interface BottomNavItem {
  label: string;
  route: keyof RootStackParamList;
}

export default function BottomNavBar({
  items,
  activeRoute,
}: {
  items: BottomNavItem[];
  activeRoute: keyof RootStackParamList;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = item.route === activeRoute;
        return (
          <TouchableOpacity
            key={item.route}
            style={[styles.item, active && styles.itemActive]}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  itemActive: {
    backgroundColor: "#e0e7ff",
  },
  label: {
    color: "#64748b",
    fontWeight: "600",
  },
  labelActive: {
    color: "#1d4ed8",
  },
});

