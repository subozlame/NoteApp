import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageStyles } from "@/hooks/pageStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { storeData, getData } from "@/utils/storage";

type Folder = { id: string; name: string };

export default function FolderScreen() {
  const styles = usePageStyles();
  const router = useRouter();

  const [folders, setFolders] = useState<Folder[]>([]);
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folderToRename, setFolderToRename] = useState<Folder | null>(null);

  // Load folders from AsyncStorage
  useEffect(() => {
    getData("folders").then((data) => {
      if (data) setFolders(data);
    });
  }, []);

  // Search suggestions (dummy)
  const SUGGESTIONS = folders.map((f) => f.name);

  const handleChange = (text: string) => {
    setQuery(text);
    const filtered = SUGGESTIONS.filter((name) =>
      name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
  };

  // Open folder
const openFolder = (folder: Folder) => {
  router.push({
    pathname: "/screens/FolderNotesScreen", // ✅ correct route
    params: {
      folderId: folder.id,
      folderName: folder.name,
    },
  });
};



  // Add folder
  const handleAddFolder = async () => {
    const trimmedName = newFolderName.trim();
    if (!trimmedName) return;

    if (folders.some((f) => f.name.toLowerCase() === trimmedName.toLowerCase())) {
      Alert.alert("Duplicate Folder", "A folder with this name already exists.");
      return;
    }

    const newFolder: Folder = { id: Date.now().toString(), name: trimmedName };
    const updatedFolders = [newFolder, ...folders];
    setFolders(updatedFolders);
    await storeData("folders", updatedFolders);
    setNewFolderName("");
    setAddModalVisible(false);
  };

  // Rename folder
  const handleRenameFolder = (folder: Folder) => {
    setFolderToRename(folder);
    setNewFolderName(folder.name);
    setRenameModalVisible(true);
  };

  const saveRenameFolder = async () => {
    if (!folderToRename) return;
    const trimmedName = newFolderName.trim();
    if (!trimmedName) return;

    if (
      folders.some(
        (f) =>
          f.id !== folderToRename.id &&
          f.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      Alert.alert("Duplicate Folder", "A folder with this name already exists.");
      return;
    }

    const updatedFolders = folders.map((f) =>
      f.id === folderToRename.id ? { ...f, name: trimmedName } : f
    );
    setFolders(updatedFolders);
    await storeData("folders", updatedFolders);
    setRenameModalVisible(false);
    setFolderToRename(null);
    setNewFolderName("");
  };

  // Delete folder
  const handleDeleteFolder = (folder: Folder) => {
    Alert.alert(
      "Delete Folder",
      `Are you sure you want to delete "${folder.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedFolders = folders.filter((f) => f.id !== folder.id);
            setFolders(updatedFolders);
            await storeData("folders", updatedFolders);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Folders" showBack={false} />

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

      {/* Folder List */}
 <FlatList
  data={folders.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  )}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.cardRow}>
      {/* Folder name */}
      <TouchableOpacity
        style={styles.cardTitleContainer}
        onPress={() => openFolder(item)}
      >
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>

      {/* Rename & Delete buttons */}
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => handleRenameFolder(item)}>
          <Ionicons name="pencil-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteFolder(item)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  )}
  ListEmptyComponent={<Text style={styles.emptyText}>No folders yet</Text>}
/>

      {/* Add Folder Modal */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Folder</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Folder name"
              value={newFolderName}
              onChangeText={setNewFolderName}
            />
            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
              <Button title="Create" onPress={handleAddFolder} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Rename Folder Modal */}
      <Modal visible={renameModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename Folder</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Folder name"
              value={newFolderName}
              onChangeText={setNewFolderName}
            />
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setRenameModalVisible(false)}
              />
              <Button title="Save" onPress={saveRenameFolder} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer with Add Note (left), Add Folder (center), Settings (right) */}
      <Footer
        screenName="Folders"
        onAddNote={() => router.push("/screens/AddNoteScreen")}
        onAddFolder={() => setAddModalVisible(true)}
      />
    </SafeAreaView>
  );
}
