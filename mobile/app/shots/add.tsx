import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { router } from "expo-router";

import { Club, getClubs } from "@/api/clubsApi";
import { ShotSession, getSessions } from "@/api/sessionsApi";
import { createShot } from "@/api/shotsApi";
import { Colors, FontSizes, Spacing } from "@/constants/theme";

export default function AddShotScreen() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [sessions, setSessions] = useState<ShotSession[]>([]);

  const [clubId, setClubId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [carryDistance, setCarryDistance] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function loadData() {
      const clubData = await getClubs();
      const sessionData = await getSessions();

      setClubs(clubData);
      setSessions(sessionData);
    }

    loadData();
  }, []);

  async function handleSave() {
    if (!clubId || !sessionId || !carryDistance) {
      Alert.alert(
        "Missing information",
        "Club, session, and carry distance are required."
      );
      return;
    }

    try {
      await createShot({
        club: Number(clubId),
        session: Number(sessionId),
        carry_distance: Number(carryDistance),
        total_distance: totalDistance ? Number(totalDistance) : undefined,
        notes,
      });

      router.back();
    } catch {
      Alert.alert("Error", "Unable to save shot.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={styles.form} onPress={Keyboard.dismiss}>
        <ScrollView>
          <Text style={styles.title}>Add Shot</Text>

          <Text style={styles.label}>Select Club</Text>

          {clubs.map((club) => (
            <Pressable
              key={club.id}
              style={[
                styles.optionCard,
                clubId === String(club.id) && styles.selectedCard,
              ]}
              onPress={() => setClubId(String(club.id))}
            >
              <Text style={styles.optionTitle}>{club.name}</Text>
              <Text style={styles.optionText}>{club.club_type_display}</Text>
            </Pressable>
          ))}

          <Text style={styles.label}>Select Session</Text>

          {sessions.map((session) => (
            <Pressable
              key={session.id}
              style={[
                styles.optionCard,
                sessionId === String(session.id) && styles.selectedCard,
              ]}
              onPress={() => setSessionId(String(session.id))}
            >
              <Text style={styles.optionTitle}>{session.name}</Text>
              <Text style={styles.optionText}>{session.location}</Text>
            </Pressable>
          ))}

          <Text style={styles.label}>Carry Distance</Text>

          <TextInput
            style={styles.input}
            value={carryDistance}
            onChangeText={setCarryDistance}
            placeholder="145"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text style={styles.label}>Total Distance</Text>

          <TextInput
            style={styles.input}
            value={totalDistance}
            onChangeText={setTotalDistance}
            placeholder="150"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text style={styles.label}>Notes</Text>

          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Solid contact"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Button title="Save Shot" onPress={handleSave} />
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.light.background,
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.medium,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.light.surface,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },
  optionTitle: {
    fontSize: FontSizes.medium,
    fontWeight: "700",
    color: Colors.light.text,
  },
  optionText: {
    fontSize: FontSizes.medium,
    color: Colors.light.mutedText,
    marginTop: Spacing.xs,
  },
});