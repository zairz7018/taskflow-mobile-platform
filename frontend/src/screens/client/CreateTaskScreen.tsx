import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { taskApi } from "../../api/taskApi";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import type { TaskPriority } from "../../types/task";
import BottomNavBar from "../../components/BottomNavBar";

const priorities: TaskPriority[] = ["BASSE", "MOYENNE", "HAUTE", "URGENTE"];

export default function CreateTaskScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MOYENNE");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await taskApi.createTask({
        title: title.trim(),
        description: description.trim() || null,
        priority,
        deadline: deadline.trim() || null,
      });
      setSuccess("Tache creee avec succes.");
      navigation.navigate("MyTasks");
    } catch (err: any) {
      setError(err?.message || "Echec de creation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creer une tache</Text>

      <View style={styles.card}>
        <AppInput label="Titre" placeholder="Ex: Repararation PC" value={title} onChangeText={setTitle} />
        <AppInput
          label="Description"
          placeholder="Details de la demande"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Priorite</Text>
        <View style={styles.row}>
          {priorities.map((item) => (
            <AppButton
              key={item}
              title={item}
              variant={priority === item ? "primary" : "secondary"}
              onPress={() => setPriority(item)}
              style={styles.priorityButton}
            />
          ))}
        </View>

        <AppInput
          label="Echeance (YYYY-MM-DD)"
          placeholder="2026-05-20"
          value={deadline}
          onChangeText={setDeadline}
        />

        {error && <Text style={styles.error}>{error}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        <AppButton
          title={loading ? "Creation..." : "Creer la tache"}
          onPress={handleCreate}
          disabled={loading}
        />
      </View>

      <BottomNavBar
        activeRoute="CreateTask"
        items={[
          { label: "Accueil", route: "ClientHome" },
          { label: "Mes taches", route: "MyTasks" },
          { label: "Creer", route: "CreateTask" },
          { label: "Profil", route: "Profile" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontWeight: "600",
    color: "#0f172a",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  priorityButton: {
    minWidth: 100,
  },
  error: {
    color: "#b91c1c",
  },
  success: {
    color: "#16a34a",
  },
});
