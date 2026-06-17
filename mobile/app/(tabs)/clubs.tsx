import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, FontSizes, BorderRadius } from "@/constants/theme";
import { Club, getClubs } from "@/api/clubsApi";

import { Link } from "expo-router";

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
    } catch (err) {
      setError("Unable to load clubs. Make sure the Django server is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClubs();
  }, []);

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
          <View key={club.id} style={styles.card}>
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.clubType}>{club.club_type_display}</Text>

            <Text style={styles.clubDistance}>
              Average: {club.average_distance ?? "Not calculated yet"}
            </Text>

            <Text style={styles.clubDistance}>
              Range: {club.shortest_distance ?? "-"} –{" "}
              {club.longest_distance ?? "-"} yards
            </Text>
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