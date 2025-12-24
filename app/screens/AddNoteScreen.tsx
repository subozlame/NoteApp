// app/screens/AddNoteScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageStyles } from "@/hooks/pageStyles";
import * as ImagePicker from "expo-image-picker";
import { storeData, getData } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";

type Folder = {
  id: string;
  name: string;
};

type Note = {
  id: string;
  title: string;
  description: string;
  images: string[];
  folderId?: string;
};

export default function AddNoteScreen() {
  const styles = usePageStyles();
  const router = useRouter();

  const {
    editId,
    title: pTitle,
    description: pDescription,
    images: pImages,
    folderId: pFolderId,
  } = useLocalSearchParams<{
    editId?: string;
    title?: string;
    description?: string;
    images?: string;
    folderId?: string;
  }>();

  const isEdit = !!editId;

  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  const [title, setTitle] = useState(pTitle || "");
  const [description, setDescription] = useState(pDescription || "");
  const [images, setImages] = useState<string[]>(
    pImages ? JSON.parse(pImages) : []
  );
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const [folderModalVisible, setFolderModalVisible] = useState(false);

  /* Load notes & folders */
  useEffect(() => {
    getData("notes").then((data) => data && setNotes(data));
    getData("folders").then((data) => {
      if (data) {
        setFolders(data);
        if (pFolderId) {
          const found = data.find((f: Folder) => f.id === pFolderId);
          if (found) setSelectedFolder(found);
        }
      }
    });
  }, []);

  /* Pick images */
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages(result.assets.map((a) => a.uri));
    }
  };

  /* Save / Update note */
  const saveNote = async () => {
    if (!title.trim() && !description.trim() && images.length === 0) {
      Alert.alert("Empty note", "Add some content before saving.");
      return;
    }

    let updated: Note[];

    if (isEdit) {
      updated = notes.map((n) =>
        n.id === editId
          ? {
              ...n,
              title,
              description,
              images,
              folderId: selectedFolder?.id,
            }
          : n
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        description,
        images,
        folderId: selectedFolder?.id,
      };
      updated = [newNote, ...notes];
    }

    setNotes(updated);
    await storeData("notes", updated);

    Alert.alert(
      isEdit ? "Updated" : "Saved",
      isEdit ? "Note updated successfully" : "Note saved successfully"
    );
    router.back();
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title={isEdit ? "Edit Note" : "Add Note"} showBack />

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={styles.input.color}
          value={title}
          onChangeText={setTitle}
        />

        {/* Description */}
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          placeholderTextColor={styles.input.color}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Folder Selector */}
        <TouchableOpacity
          style={styles.folderSelector}
          onPress={() => setFolderModalVisible(true)}
        >
          <Ionicons name="folder-outline" size={22} />
          <Text style={styles.folderSelectorText}>
            {selectedFolder ? selectedFolder.name : "Select Folder"}
          </Text>
        </TouchableOpacity>

        {/* Images */}
        <ScrollView horizontal style={styles.imageRow}>
          {images.map((uri) => (
            <Image key={uri} source={{ uri }} style={styles.imagePreview} />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.secondaryButton} onPress={pickImages}>
          <Text style={styles.secondaryButtonText}>Add Images</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={saveNote}>
          <Text style={styles.primaryButtonText}>
            {isEdit ? "Update Note" : "Save Note"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Folder Picker Modal */}
      <Modal visible={folderModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Folder</Text>

            <FlatList
              data={folders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedFolder(item);
                    setFolderModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setFolderModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer screenName="AddNote" onAddNote={() => {}} />
    </SafeAreaView>
  );
}
