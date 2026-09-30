import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import "../../global.css";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#38bdf8", tabBarInactiveTintColor: "#94a3b8", tabBarStyle: { backgroundColor: "#091526", borderTopWidth: 0, elevation: 60, shadowColor: "#000" } }}>
      <Tabs.Screen name="index" options={{ title: "Home", header: () => <Navbar />, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: "History", header: () => <Navbar />, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "time" : "time-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="createDream" options={{ title: "Create", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="insight" options={{ title: "Insight", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "analytics" : "analytics-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} /> }} />
    </Tabs>
  );
}