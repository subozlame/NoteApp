// app/screens/SearchScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageStyles } from "@/hooks/pageStyles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getData } from "@/utils/storage";

type Folder = {
  id: string;
  name: string;
};

export default function SearchScreen() {
  const styles = usePageStyles();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([]);

  // Load folders from AsyncStorage on mount
  useEffect(() => {
    const fetchFolders = async () => {
      const data = await getData("folders");
      if (data) {
        setFolders(data);
        setFilteredFolders(data); // initially show all folders
      }
    };
    fetchFolders();
  }, []);

  // Filter folders in real-time
  const handleChange = (text: string) => {
    setQuery(text);
    const filtered = folders.filter((f) =>
      f.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFolders(filtered);
  };

  const handleSelectFolder = (folder: Folder) => {
    router.push(`/screens/AddNoteScreen?folder=${folder.id}`);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Search" showBack />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color={styles.input.color} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search folders..."
          placeholderTextColor={styles.input.color}
          value={query}
          onChangeText={handleChange}
        />
      </View>

      {/* Real-time Folder Results */}
      <FlatList
        data={filteredFolders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectFolder(item)}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {query ? "No folders found" : "No folders yet"}
          </Text>
        }
      />

      <Footer screenName="Search" onAddNote={() => router.push("/screens/AddNoteScreen")} />
    </SafeAreaView>
  );
}
