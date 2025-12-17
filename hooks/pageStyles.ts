// hooks/usePageStyles.ts
import { StyleSheet } from "react-native";
import { useDarkMode } from "@/contexts/darkmodeContext";

export const usePageStyles = () => {
  const { isDarkMode } = useDarkMode();

  return StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: isDarkMode ? "#111827" : "#F3F4F6",
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#FFF" : "#1F2937",
      marginVertical: 12,
    },
    input: {
      backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
      color: isDarkMode ? "#FFF" : "#1F2937",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDarkMode ? "#374151" : "#E5E7EB",
    },
    button: {
      backgroundColor: "#2563EB",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 12,
    },
    buttonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
    },
    card: {
      backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    cardText: {
      color: isDarkMode ? "#FFF" : "#1F2937",
      fontSize: 16,
      marginBottom: 4,
    },
    emptyText: {
      textAlign: "center",
      marginTop: 20,
      color: isDarkMode ? "#9CA3AF" : "#6B7280",
    },

    // Footer styles added
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      borderTopWidth: 1,
    },
    screenName: {
      fontSize: 16,
      fontWeight: "500",
    },

    // Actions
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 20,
    },
    actionButton: {
      alignItems: "center",
    },
    actionText: {
      marginTop: 4,
      fontSize: 14,
      color: isDarkMode ? "#D1D5DB" : "#1F2937",
    },

    // Modal
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
      borderRadius: 8,
      padding: 16,
    },
    modalTitle: {
      fontSize: 16,
      marginBottom: 8,
      color: isDarkMode ? "#FFF" : "#1F2937",
      fontWeight: "bold",
    },
    modalInput: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#374151" : "#D1D5DB",
      borderRadius: 6,
      padding: 8,
      color: isDarkMode ? "#FFF" : "#1F2937",
      backgroundColor: isDarkMode ? "#111827" : "#FFF",
      marginBottom: 8,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 12,
    },
    modalButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: "#2563EB",
      borderRadius: 6,
      marginLeft: 8,
    },
    modalButtonText: {
      color: "#FFF",
      fontWeight: "bold",
    },
    searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
  paddingHorizontal: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: isDarkMode ? "#374151" : "#D1D5DB",
  marginVertical: 12,
},
searchInput: {
  flex: 1,
  paddingVertical: 8,
  color: isDarkMode ? "#FFF" : "#1F2937",
  marginLeft: 8,
},
suggestionsDropdown: {
  maxHeight: 200,
  borderWidth: 1,
  borderColor: isDarkMode ? "#374151" : "#D1D5DB",
  borderRadius: 8,
  marginTop: 4,
  backgroundColor: isDarkMode ? "#111827" : "#FFF",
},
suggestionItem: {
  padding: 12,
},
suggestionText: {
  color: isDarkMode ? "#FFF" : "#1F2937",
},

  });
};
