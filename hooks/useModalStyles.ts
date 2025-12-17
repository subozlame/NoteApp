import { StyleSheet, Dimensions } from "react-native";
import { useDarkMode } from "@/contexts/darkmodeContext";

export const useModalStyles = () => {
  const { isDarkMode } = useDarkMode();

  return StyleSheet.create({
    modalContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDarkMode ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)",
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
    blurOverlay: {
      ...StyleSheet.absoluteFillObject,
    },
  });
};
