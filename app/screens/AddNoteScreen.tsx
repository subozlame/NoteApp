import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, Alert } from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageStyles } from "@/hooks/pageStyles";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import { storeData, getData } from "@/utils/storage";

type Note = { id: string; title: string; description: string; images: string[] };

export default function AddNoteScreen() {
  const styles = usePageStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Load notes from AsyncStorage
    getData("notes").then(data => {
      if (data) setNotes(data);
    });
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(a => a.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const saveNote = async () => {
    if (!title && !description && images.length === 0) {
      Alert.alert("Cannot save empty note");
      return;
    }
    const newNote: Note = { id: uuidv4(), title, description, images };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    await storeData("notes", updatedNotes);

    setTitle("");
    setDescription("");
    setImages([]);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Add Note" showBack />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView>
          <TextInput style={styles.input} placeholder="Title" placeholderTextColor="#9CA3AF" value={title} onChangeText={setTitle} />
          <TextInput style={[styles.input, { height: 100 }]} placeholder="Description" placeholderTextColor="#9CA3AF" multiline value={description} onChangeText={setDescription} />

          <ScrollView horizontal style={{ marginBottom: 8 }}>
            {images.map(uri => (
              <Image key={uri} source={{ uri }} style={{ width: 80, height: 80, marginRight: 8, borderRadius: 8 }} />
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={pickImages}>
            <Text style={styles.buttonText}>+ Add Attachments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={saveNote}>
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer screenName="Add Note" />
    </SafeAreaView>
  );
}
