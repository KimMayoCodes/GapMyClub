import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useFocusEffect } from "expo-router";

import { getShots, Shot } from "@/api/shotsApi";
import { BorderRadius, Colors, FontSizes, Spacing } from "@/constants/theme";

export default function ShotsScreen() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadShots() {
    try {
      setLoading(true);
      setError(null);

      const data = await getShots();
      setShots(data);
    } catch {
      setError("Unable to load shots. Make sure the Django server is running.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadShots();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.message}>Loading shots...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shots</Text>

      <Link href="/shots/add" style={styles.addLink}>
        + Add Shot
      </Link>

      {shots.length === 0 ? (
        <Text style={styles.message}>No shots found.</Text>
      ) : (
        shots.map((shot) => (
          <View key={shot.id} style={styles.card}>
            <Text style={styles.clubName}>
              {shot.club_name} ({shot.club_type_display})
            </Text>

            <Text style={styles.detail}>
              Session: {shot.session_name}
            </Text>

            <Text style={styles.distance}>
              Carry: {shot.carry_distance} yards
            </Text>

            <Text style={styles.detail}>
              Total: {shot.total_distance ?? "-"} yards
            </Text>

            {shot.notes ? (
              <Text style={styles.notes}>Notes: {shot.notes}</Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.light.background,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: Colors.light.primary,
    marginBottom: Spacing.lg,
  },
  addLink: {
    fontSize: FontSizes.medium,
    color: Colors.light.primary,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  clubName: {
    fontSize: FontSizes.large,
    fontWeight: "700",
    color: Colors.light.text,
  },
  distance: {
    fontSize: FontSizes.medium,
    color: Colors.light.primary,
    marginTop: Spacing.xs,
    fontWeight: "700",
  },
  detail: {
    fontSize: FontSizes.medium,
    color: Colors.light.mutedText,
    marginTop: Spacing.xs,
  },
  notes: {
    fontSize: FontSizes.medium,
    color: Colors.light.text,
    marginTop: Spacing.sm,
  },
  message: {
    fontSize: FontSizes.medium,
    color: Colors.light.mutedText,
    marginTop: Spacing.md,
    textAlign: "center",
  },
  error: {
    fontSize: FontSizes.medium,
    color: Colors.light.error,
    textAlign: "center",
  },
});