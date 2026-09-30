import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import CreateJournalNavbar from "@/components/CreateJournalNavbar";
import "../../global.css";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#38bdf8", tabBarInactiveTintColor: "#94a3b8", tabBarStyle: { backgroundColor: "#091526", borderTopWidth: 0, height: 60, paddingBottom: 8 } }}>
      <Tabs.Screen name="index" options={{ title: "Home", header: () => <Navbar />, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: "History", header: () => <Navbar />, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="createDream" options={{ title: "", header: () => <CreateJournalNavbar />, tabBarStyle: { display: "none" }, tabBarIcon: () => <View className="bg-[#38bdf8] w-12 h-12 rounded-full items-center justify-center -mt-5 shadow-lg shadow-[#38bdf8]/50"><Ionicons name="add" size={30} color="#091526" /></View> }} />
      <Tabs.Screen name="insight" options={{ title: "Insights", header: () => <Navbar />, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", header: () => <Navbar />, tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} /> }} />
    </Tabs>
  );
}