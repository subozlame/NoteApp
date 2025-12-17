// app/screens/SearchScreen.tsx
import React, { useState } from "react";
import { SafeAreaView, View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageStyles } from "@/hooks/pageStyles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SUGGESTIONS = [
  "Shared Notice",
  "Locked Notice",
  "Notes with Checklists",
  "Notes with Tags",
  "Notes with Drawings",
  "Notes with Scanned Documents",
  "Notes with Attachments",
];

export default function SearchScreen() {
  const styles = usePageStyles();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (text: string) => {
    setQuery(text);
    const filtered = SUGGESTIONS.filter((s) =>
      s.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    // Optional: trigger search/filter notes here
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Search" showBack />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color={styles.input.color} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes, folders, attachments..."
          placeholderTextColor={styles.input.color}
          value={query}
          onChangeText={handleChange}
        />
      </View>

      {/* Suggestions Dropdown */}
      {filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item) => item}
          style={styles.suggestionsDropdown}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectSuggestion(item)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Footer */}
      <Footer screenName="Search" onAddNote={() => router.push("/screens/AddNoteScreen")} />
    </SafeAreaView>
  );
}
