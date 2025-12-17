import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useDarkMode } from '@/contexts/darkmodeContext';

export const useHeaderStyles = (isToggled: boolean) => {
  const { isDarkMode } = useDarkMode();

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#F9FAFB' : '#1F2937',
    },
    right: {
      position: 'relative',
    },
    menuButton: {
      padding: 8,
      borderRadius: 8,
    },
    dropdown: {
      position: 'absolute',
      right: 0,
      top: 40,
      width: 160,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFF',
      borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
    },
    dropdownText: {
      color: isDarkMode ? '#F9FAFB' : '#374151',
      fontWeight: '500',
    },
    toggleContainer: {
      width: 44,
      height: 24,
      borderRadius: 12,
      backgroundColor: isToggled
        ? '#2563EB'
        : isDarkMode
        ? '#6B7280'
        : '#D1D5DB',
      justifyContent: 'center',
      padding: 2,
    },
    toggleCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#FFF',
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
  marginBottom: 12,
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
