# NoteApp

A lightweight, cross-platform **note-taking app** built with **React Native** and **Expo**, featuring folders, images, note editing, and dark mode support.

---

## Features

- **Folders**: Organize your notes into folders.  
- **Add/Edit Notes**: Create notes with a title, description, and images. Edit existing notes.  
- **Rename/Delete Notes**: Rename notes inline and delete notes when needed.  
- **Image Support**: Add multiple images to a note and view them fullscreen.  
- **Dark Mode**: Toggle between light and dark themes.  
- **Persistent Storage**: Notes and folders are stored locally using AsyncStorage.  
- **Backup/Restore (Coming Soon)**: Placeholder for future backup and restore features.  

---

## Screens

1. **Folders Screen**  
   - View all folders.  
   - Add new folders.  

2. **Folder Notes Screen**  
   - View all notes inside a folder.  
   - Rename, delete, or edit notes.  
   - View images in full screen.  

3. **Add/Edit Note Screen**  
   - Create a new note or edit an existing note.  
   - Pick multiple images from the gallery.  
   - Assign notes to folders.  

4. **Settings Screen**  
   - Toggle dark mode.  
   - Enable/disable notifications.  
   - Enable/disable auto-save.  
   - Clear all notes.  

---

## Installation

1. **Clone the repository**

```bash
git clone <repository_url>
cd NoteApp
npm install
```

2. **Run the application using expo router**

   ```bash
   npx expo start -c
   ```

