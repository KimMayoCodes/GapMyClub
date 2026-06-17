import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { createClub } from "@/api/clubsApi";
import { Colors, Spacing, FontSizes } from "@/constants/theme";

export default function AddClubScreen() {
  const [name, setName] = useState("");
  const [clubType, setClubType] = useState("IRON");
  const [notes, setNotes] = useState("");

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter a club name.");
      return;
    }

    try {
      await createClub({
        name,
        club_type: clubType,
        notes,
      });

      router.back();
    } catch {
      Alert.alert("Error", "Unable to save club.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Club</Text>

      <Text style={styles.label}>Club Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="7 Iron"
      />

      <Text style={styles.label}>Club Type</Text>
      <TextInput
        style={styles.input}
        value={clubType}
        onChangeText={setClubType}
        placeholder="IRON"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Optional notes"
      />

      <Button title="Save Club" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.medium,
    marginBottom: Spacing.xs,
    color: Colors.light.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
});