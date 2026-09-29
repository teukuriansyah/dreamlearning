import { Stack, Tabs } from "expo-router";
import "../../global.css"

export default function RootLayout() {
  return(
    <Tabs>
      <Tabs.Screen name="index" options={{ title:"Home" }} />
      <Tabs.Screen name="history" options={{ title:"History" }} />
      <Tabs.Screen name="createDream" />
      <Tabs.Screen name="insight" options={{ title:"Insight" }} />
      <Tabs.Screen name="settings" options={{ title:"Settings" }} />
    </Tabs>
  );
}
