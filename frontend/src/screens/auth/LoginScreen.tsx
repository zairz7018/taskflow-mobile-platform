import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { AuthContext } from "../../context/AuthContext";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
    } catch (err: any) {
      setError(err?.message || "Connexion echouee. Reessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.appTitle}>TaskFlow</Text>
        <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

        <AppInput
          label="Email"
          placeholder="ex: client@test.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <AppInput
          label="Mot de passe"
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <AppButton
          title={loading ? "Connexion..." : "Se connecter"}
          onPress={handleLogin}
          disabled={loading}
        />

        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Pas encore de compte ? Creer un compte
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    gap: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    color: "#64748b",
    textAlign: "center",
    marginBottom: 6,
  },
  error: {
    color: "#b91c1c",
  },
  link: {
    color: "#1d4ed8",
    textAlign: "center",
    marginTop: 4,
  },
});
