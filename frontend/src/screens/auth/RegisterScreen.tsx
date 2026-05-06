import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { AuthContext } from "../../context/AuthContext";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import type { Role } from "../../types/auth";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("CLIENT");
  const [speciality, setSpeciality] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const message = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        role,
        speciality: role === "EMPLOYE" ? speciality.trim() : null,
      });
      setSuccess(message || "Inscription reussie. Veuillez vous connecter.");
      navigation.navigate("Login");
    } catch (err: any) {
      setError(err?.message || "Inscription echouee. Reessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.appTitle}>TaskFlow</Text>
        <Text style={styles.subtitle}>Creez votre compte pour commencer</Text>

        <AppInput
          label="Nom complet"
          placeholder="Ex: Client Test"
          value={fullName}
          onChangeText={setFullName}
        />

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

        <Text style={styles.sectionTitle}>Role</Text>
        <View style={styles.roleRow}>
          <AppButton
            title="CLIENT"
            variant={role === "CLIENT" ? "primary" : "secondary"}
            onPress={() => setRole("CLIENT")}
            style={styles.roleButton}
          />
          <AppButton
            title="EMPLOYE"
            variant={role === "EMPLOYE" ? "primary" : "secondary"}
            onPress={() => setRole("EMPLOYE")}
            style={styles.roleButton}
          />
        </View>

        {role === "EMPLOYE" && (
          <AppInput
            label="Specialite"
            placeholder="Support technique"
            value={speciality}
            onChangeText={setSpeciality}
          />
        )}

        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        <AppButton
          title={loading ? "Creation..." : "S'inscrire"}
          onPress={handleRegister}
          disabled={loading}
        />

        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Deja un compte ? Se connecter
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
  sectionTitle: {
    fontWeight: "600",
    color: "#0f172a",
  },
  roleRow: {
    flexDirection: "row",
    gap: 8,
  },
  roleButton: {
    flex: 1,
  },
  error: {
    color: "#b91c1c",
  },
  success: {
    color: "#16a34a",
  },
  link: {
    color: "#1d4ed8",
    textAlign: "center",
    marginTop: 4,
  },
});
