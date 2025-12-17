import React from "react";
import { View, Text, Switch, SafeAreaView } from "react-native";
import { useDarkMode } from "@/contexts/darkmodeContext";
import Header from "@/components/Header";
import { usePageStyles } from "@/hooks/pageStyles";

export default function SettingsScreen() {
  const styles = usePageStyles();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Settings" />
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: isDarkMode ? "#FFF" : "#1F2937" }}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
          thumbColor="#FFF"
        />
      </View>
    </SafeAreaView>
  );
}
