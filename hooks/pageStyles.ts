// hooks/usePageStyles.ts
import { StyleSheet } from "react-native";
import { useDarkMode } from "@/contexts/darkmodeContext";
import { Dimensions } from "react-native";
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
      padding: 20,
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
      padding: 20,
      borderRadius: 8,
      marginBottom: 8,
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
      padding: 15,
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
  padding: 8,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: isDarkMode ? "#374151" : "#D1D5DB",
  marginVertical: 20,
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
cardRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
},
cardTitleContainer: {
  flex: 1,
},
cardActions: {
  flexDirection: "row",
  alignItems: "center",
},
deleteButton: {
  marginLeft: 12,
},
// Scroll container (optional but recommended)
scroll: {
  flex: 1,
},

// Multiline description input
textArea: {
  backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
  color: isDarkMode ? "#FFF" : "#1F2937",
  padding: 20,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: isDarkMode ? "#374151" : "#E5E7EB",
  height: 180,
  textAlignVertical: "top",
  marginBottom: 12,
},

// Save note button (inside AddNote page)
saveButton: {
  backgroundColor: "#16A34A",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
  marginVertical: 16,
},
saveButtonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "bold",
},

// Image preview row
imageRow: {
  flexDirection: "row",
  marginVertical: 10,
},
imagePreview: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 10,
  backgroundColor: isDarkMode ? "#374151" : "#E5E7EB",
},
folderSelector: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: isDarkMode ? "#1F2937" : "#FFF",
  padding: 14,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: isDarkMode ? "#374151" : "#D1D5DB",
  marginBottom: 12,
},
folderSelectorText: {
  marginLeft: 10,
  fontSize: 15,
  color: isDarkMode ? "#D1D5DB" : "#374151",
},
modalItem: {
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderBottomColor: isDarkMode ? "#374151" : "#E5E7EB",
},
modalItemText: {
  fontSize: 16,
  color: isDarkMode ? "#FFF" : "#1F2937",
},
modalCancel: {
  paddingVertical: 14,
  alignItems: "center",
},
modalCancelText: {
  color: "#2563EB",
  fontSize: 16,
  fontWeight: "500",
},
// Primary action button (Save Note)
primaryButton: {
  backgroundColor: "#2563EB",
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  marginVertical: 12,
},
primaryButtonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "bold",
},

// Secondary action button (Cancel / Select Folder / etc)
secondaryButton: {
  backgroundColor: isDarkMode ? "#374151" : "#E5E7EB",
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
  marginVertical: 8,
},
secondaryButtonText: {
  color: isDarkMode ? "#E5E7EB" : "#1F2937",
  fontSize: 15,
  fontWeight: "500",
},

description: {
  color: isDarkMode ? "#D1D5DB" : "#1F2937",
  fontSize: 16,
  marginBottom: 12,
  lineHeight: 22,
},
modalContainer: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: isDarkMode ? "#000" : "#000",
  zIndex: 1000,
},
noteContent: {
  padding: 16,
  paddingBottom: 40,
},
imageOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
},
fullImage: {
  width: Dimensions.get("window").width * 0.9,
  height: Dimensions.get("window").height * 0.7,
  borderRadius: 16,
},
closeButton: {
  position: "absolute",
  top: 40,
  right: 20,
  zIndex: 10,
},
closeText: {
  fontSize: 28,
  color: "#fff",
  fontWeight: "bold",
},


  });
};
