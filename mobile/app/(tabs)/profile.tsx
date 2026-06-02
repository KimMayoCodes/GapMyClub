import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, FontSizes } from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.text}>
        Manage your GapMyClub settings.
      </Text>

      <Text style={styles.text}>
        Player: Demo Golfer
      </Text>

      <Text style={styles.text}>
        Handicap: Coming soon
      </Text>
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

  text: {
    fontSize: FontSizes.medium,
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
});