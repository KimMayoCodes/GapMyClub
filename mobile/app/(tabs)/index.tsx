import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>GapMyClub</Text>

      <Text style={styles.tagline}>
        Track. Analyze. Swing smarter.
      </Text>

      <Text style={styles.description}>
        Know your distances. Choose the right club.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },

  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0B6623",
    marginBottom: 8,
  },

  tagline: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
  },
});