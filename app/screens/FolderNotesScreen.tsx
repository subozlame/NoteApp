import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { usePageStyles } from "@/hooks/pageStyles";
import { useModalStyles } from "@/hooks/useModalStyles";
import { getData } from "@/utils/storage";
import { BlurView } from "expo-blur";

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

  useEffect(() => {
    getData("notes").then((data) => {
      if (data) {
        const filtered = data.filter((note: Note) => note.folderId === folderId);
        setNotes(filtered);
      }
    });
  }, [folderId]);

  return (
    <SafeAreaView style={styles.page}>
      <Header title={folderName || "Folder"} showBack />

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardRow}
            onPress={() => setSelectedNote(item)}
          >
            <Text style={[styles.cardText, { fontSize: 20 }]}>
              {item.title || "Untitled Note"}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>This folder is empty</Text>
        }
      />

      {/* Note Modal */}
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
              <Text style={[styles.description, { fontSize: 18, marginBottom: 16 }]}>
                {selectedNote.description}
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
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
    </SafeAreaView>
  );
}
