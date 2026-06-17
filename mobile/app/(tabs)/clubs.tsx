import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router, useFocusEffect } from "expo-router";

import { Club, getClubs } from "@/api/clubsApi";
import { BorderRadius, Colors, FontSizes, Spacing } from "@/constants/theme";

export default function ClubsScreen() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadClubs() {
    try {
      setLoading(true);
      setError(null);

      const data = await getClubs();
      setClubs(data);
    } catch {
      setError("Unable to load clubs. Make sure the Django server is running.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadClubs();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.message}>Loading clubs...</Text>
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
      <Text style={styles.title}>My Clubs</Text>

      <Link href="/clubs/add" style={styles.addLink}>
        + Add Club
      </Link>

      {clubs.length === 0 ? (
        <Text style={styles.message}>No clubs found.</Text>
      ) : (
        clubs.map((club) => (
          <Pressable
            key={club.id}
            style={styles.card}
            onPress={() => router.push(`/clubs/${club.id}`)}
          >
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.clubType}>{club.club_type_display}</Text>

            <Text style={styles.clubDistance}>
              Average: {club.average_distance ?? "Not calculated yet"}
            </Text>

            <Text style={styles.clubDistance}>
              Shots: {club.shot_count}
            </Text>

            <Text style={styles.clubDistance}>
              Range: {club.shortest_distance ?? "-"} –{" "}
              {club.longest_distance ?? "-"} yards
            </Text>
          </Pressable>
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
    marginBottom: Spacing.md,
    fontWeight: "700",
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
  clubType: {
    fontSize: FontSizes.medium,
    color: Colors.light.primary,
    marginTop: Spacing.xs,
  },
  clubDistance: {
    fontSize: FontSizes.medium,
    color: Colors.light.mutedText,
    marginTop: Spacing.xs,
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