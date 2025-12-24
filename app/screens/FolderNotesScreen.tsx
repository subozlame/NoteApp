import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { usePageStyles } from "@/hooks/pageStyles";
import { useModalStyles } from "@/hooks/useModalStyles";
import { getData, storeData } from "@/utils/storage";
import { BlurView } from "expo-blur";
import Footer from "@/components/Footer";
import { Ionicons } from "@expo/vector-icons";

type Note = {
  id: string;
  title: string;
  description: string;
  images: string[];
  folderId: string;
};

export default function FolderNotesScreen() {
  const styles = usePageStyles();
  const modalStyles = useModalStyles();

  const { folderId, folderName } = useLocalSearchParams<{
    folderId: string;
    folderName: string;
  }>();

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      const data = await getData("notes");
      if (data) {
        const filtered = data.filter(
          (note: Note) => note.folderId === folderId
        );
        setNotes(filtered);
      }
    };
    loadNotes();
  }, [folderId]);

  function setAddModalVisible(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  const handleDeleteNote = (id: string) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const allNotes = (await getData("notes")) || [];
          const updated = allNotes.filter((n: Note) => n.id !== id);

          await storeData("notes", updated);
          setNotes(updated.filter((n: Note) => n.folderId === folderId));
        },
      },
    ]);
  };

  const startRename = (note: Note) => {
    setRenamingId(note.id);
    setRenameText(note.title);
  };

  const saveRename = async () => {
    if (!renamingId) return;

    const allNotes = (await getData("notes")) || [];
    const updated = allNotes.map((n: Note) =>
      n.id === renamingId ? { ...n, title: renameText } : n
    );

    await storeData("notes", updated);
    setNotes(updated.filter((n: Note) => n.folderId === folderId));

    setRenamingId(null);
    setRenameText("");
  };

  const handleEditNote = (note: Note) => {
    router.push({
      pathname: "/screens/AddNoteScreen",
      params: {
        editId: note.id,
        title: note.title,
        description: note.description,
        images: JSON.stringify(note.images),
        folderId: note.folderId,
      },
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title={folderName || "Folder"} showBack />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.cardRow,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            {renamingId === item.id ? (
              <TextInput
                value={renameText}
                onChangeText={setRenameText}
                autoFocus
                onSubmitEditing={saveRename}
                style={[styles.cardText, { fontSize: 20, flex: 1 }]}
              />
            ) : (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setSelectedNote(item)}
              >
                <Text style={[styles.cardText, { fontSize: 20 }]}>
                  {item.title || "Untitled Note"}
                </Text>
              </TouchableOpacity>
            )}

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity onPress={() => handleEditNote(item)}>
                <Ionicons name="create-outline" size={22} color="#3498db" />
              </TouchableOpacity>

              {renamingId === item.id ? (
                <TouchableOpacity onPress={saveRename}>
                  <Ionicons name="checkmark" size={24} color="green" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => startRename(item)}>
                  <Ionicons name="pencil" size={22} color="#888" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => handleDeleteNote(item.id)}
              >
                <Ionicons name="trash" size={22} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>This folder is empty</Text>
        }
      />

      {selectedNote && (
        <SafeAreaView style={modalStyles.modalContainer}>
          <Header title={selectedNote.title} showBack />

          {activeImage ? (
            <BlurView intensity={80} style={modalStyles.blurOverlay}>
              <SafeAreaView style={modalStyles.imageOverlay}>
                <TouchableOpacity
                  style={modalStyles.closeButton}
                  onPress={() => setActiveImage(null)}
                >
                  <Text style={modalStyles.closeText}>✕</Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: activeImage }}
                  style={modalStyles.fullImage}
                  resizeMode="contain"
                />
              </SafeAreaView>
            </BlurView>
          ) : (
            <ScrollView contentContainerStyle={modalStyles.noteContent}>
              <Text style={[styles.title, { fontSize: 24 }]}>
                {selectedNote.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  { fontSize: 18, marginBottom: 16 },
                ]}
              >
                {selectedNote.description}
              </Text>

              <View
                style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}
              >
                {selectedNote.images.map((uri) => (
                  <TouchableOpacity
                    key={uri}
                    onPress={() => setActiveImage(uri)}
                    style={{ borderRadius: 12, overflow: "hidden" }}
                  >
                    <Image
                      source={{ uri }}
                      style={{ width: 150, height: 150, borderRadius: 12 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.button, { marginTop: 20 }]}
                onPress={() => setSelectedNote(null)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </SafeAreaView>
      )}

      <Footer
        screenName="Folders"
        onAddNote={() => router.push("/screens/AddNoteScreen")}
        onAddFolder={() => setAddModalVisible(true)}
      />
    </SafeAreaView>
  );
}
