// app/screens/FolderScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageStyles } from "@/hooks/pageStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { storeData, getData } from "@/utils/storage";

type Folder = {
  id: string;
  name: string;
};

const SUGGESTIONS = [
  "Shared Notice",
  "Locked Notice",
  "Notes with Checklists",
  "Notes with Tags",
  "Notes with Drawings",
  "Notes with Scanned Documents",
  "Notes with Attachments",
];

export default function FolderScreen() {
  const styles = usePageStyles();
  const router = useRouter();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Load folders from AsyncStorage
  useEffect(() => {
    getData("folders").then((data) => {
      if (data) setFolders(data);
    });
  }, []);

  // Search filter logic
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
    // Optionally, you could filter folders/notes here
  };

  // Open folder
  const openFolder = (folder: Folder) => {
    router.push(`/screens/AddNoteScreen?folder=${folder.id}`);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Folders" showBack={false} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color={styles.input.color} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search folders, notes, attachments..."
          placeholderTextColor={styles.input.color}
          value={query}
          onChangeText={handleChange}
        />
      </View>

      {/* Dropdown Suggestions */}
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

      {/* Folder List */}
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openFolder(item)}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No folders yet</Text>}
      />

      <Footer screenName="Folders" onAddNote={() => router.push("/screens/AddNoteScreen")} />
    </SafeAreaView>
  );
}
