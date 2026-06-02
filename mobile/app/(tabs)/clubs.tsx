import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, FontSizes, BorderRadius } from "@/constants/theme";

export default function ClubsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Clubs</Text>

      <View style={styles.card}>
        <Text style={styles.clubName}>Driver</Text>
        <Text style={styles.clubDistance}>Average: 225 yards</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.clubName}>7 Iron</Text>
        <Text style={styles.clubDistance}>Average: 145 yards</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.clubName}>Pitching Wedge</Text>
        <Text style={styles.clubDistance}>Average: 105 yards</Text>
      </View>
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
  clubDistance: {
    fontSize: FontSizes.medium,
    color: Colors.light.mutedText,
    marginTop: Spacing.xs,
  },
});