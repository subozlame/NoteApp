import { StyleSheet } from "react-native";
import { useDarkMode } from "@/contexts/darkmodeContext";

export const useHeaderStyles = (isToggled: boolean) => {
  const { isDarkMode } = useDarkMode();
  const darkBg = isDarkMode ? "#1E293B" : "#FFFFFF"; // lighter dark mode
  const darkBorder = isDarkMode ? "#334155" : "#E5E7EB"; // softer border
  const textColor = isDarkMode ? "#F1F5F9" : "#1F2937";

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: darkBg,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 6,
      borderBottomWidth: 1,
      borderBottomColor: darkBorder,
      borderRadius: 16,
      height: 75,
      paddingHorizontal: 20,
    },
    left: { flexDirection: "row", alignItems: "center" },
    title: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "bold", color: textColor },
    right: { width: 28 },
    menuButton: { padding: 8, borderRadius: 8 },
    dropdown: {
      position: "absolute",
      right: 0,
      top: 40,
      width: 160,
      backgroundColor: darkBg,
      borderColor: darkBorder,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
    },
    dropdownText: { color: textColor, fontWeight: "500" },
    toggleContainer: {
      width: 44,
      height: 24,
      borderRadius: 12,
      backgroundColor: isToggled ? "#2563EB" : darkBorder,
      justifyContent: "center",
      padding: 2,
    },
    toggleCircle: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFF" },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: darkBg,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: darkBorder,
      marginVertical: 12,
    },
    searchInput: { flex: 1, paddingVertical: 8, color: textColor, marginLeft: 8 },
    suggestionsDropdown: {
      maxHeight: 200,
      borderWidth: 1,
      borderColor: darkBorder,
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: darkBg,
    },
    suggestionItem: { padding: 12 },
    suggestionText: { color: textColor },
    footer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 60,
  paddingHorizontal: 16,
  borderTopWidth: 1,
  borderTopColor: isDarkMode ? "#334155" : "#E5E7EB",
  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
  borderRadius: 12,
},
footerButton: {
  padding: 4,
},
footerSpacer: {
  width: 32, // same size as icons to keep spacing
}
  });
};
