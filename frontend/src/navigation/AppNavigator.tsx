import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ClientHomeScreen from "../screens/client/ClientHomeScreen";
import MyTasksScreen from "../screens/client/MyTasksScreen";
import CreateTaskScreen from "../screens/client/CreateTaskScreen";
import EmployeHomeScreen from "../screens/employe/EmployeHomeScreen";
import AvailableTasksScreen from "../screens/employe/AvailableTasksScreen";
import MyAssignedTasksScreen from "../screens/employe/MyAssignedTasksScreen";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import ProfileScreen from "../screens/common/ProfileScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ClientHome: undefined;
  MyTasks: undefined;
  CreateTask: undefined;
  EmployeHome: undefined;
  AvailableTasks: undefined;
  MyAssignedTasks: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  const isLoggedIn = Boolean(auth.token);
  const isClient = auth.role === "CLIENT";

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn && (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}

        {isLoggedIn && isClient && (
          <>
            <Stack.Screen name="ClientHome" component={ClientHomeScreen} />
            <Stack.Screen name="MyTasks" component={MyTasksScreen} />
            <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}

        {isLoggedIn && !isClient && (
          <>
            <Stack.Screen name="EmployeHome" component={EmployeHomeScreen} />
            <Stack.Screen name="AvailableTasks" component={AvailableTasksScreen} />
            <Stack.Screen
              name="MyAssignedTasks"
              component={MyAssignedTasksScreen}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
