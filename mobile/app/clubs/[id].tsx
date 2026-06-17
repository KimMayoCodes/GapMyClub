import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import {
  Club,
  getClubs,
  updateClub,
  deleteClub,
} from "@/api/clubsApi";

import { Colors, Spacing, FontSizes } from "@/constants/theme";

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams();

  const [club, setClub] = useState<Club | null>(null);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function loadClub() {
      const clubs = await getClubs();
      const selected = clubs.find(
        (club) => club.id === Number(id)
      );

      if (selected) {
        setClub(selected);
        setName(selected.name);
        setNotes(selected.notes ?? "");
      }
    }

    loadClub();
  }, [id]);

  async function saveChanges() {
    if (!club) return;

    await updateClub(club.id, {
      name,
      notes,
    });

    router.back();
  }

  async function removeClub() {
    if (!club) return;

    Alert.alert(
      "Delete Club",
      "Are you sure?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteClub(club.id);
            router.back();
          },
        },
      ]
    );
  }

  if (!club) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Club</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
      />

      <Button
        title="Save Changes"
        onPress={saveChanges}
      />

      <Button
        title="Delete Club"
        color="red"
        onPress={removeClub}
      />
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
    marginBottom: Spacing.lg,
  },
  input: {
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
});