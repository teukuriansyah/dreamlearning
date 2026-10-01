import { Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import localStorage from "../../modules/localstorage/src/LocalstorageModule";
import List from "../components/List";

export default function Index() {
  const [datas, setDatas] = useState<any>([]);

  const todayDate = new Date();
  const formattedToday = todayDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const fetchingData = () => {
    const data = localStorage.getData();
    if (data && data !== "No Data") {
      try {
        setDatas([...JSON.parse(data)].reverse());
      } catch {
        setDatas([]);
      }
    } else {
      setDatas([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchingData();
    }, [])
  );

  const todayDream = datas.find((d: any) => d.date === formattedToday);
  const recentDreams = datas.filter((d: any) => d.date !== formattedToday);

  return (
    <ScrollView className="bg-[#081425]">
      <View className="px-5 py-2"><Text className="text-xl font-semibold text-white">Good Morning, Code Number 9</Text></View>

      {/* Today's entry */}
      <View className="px-5 py-2">
        <View><Text className="text-gray-600 font-medium">TODAY'S ENTRY</Text></View>
        <View className="bg-[#111C2D] rounded-xl px-6 py-4 mt-2 ">
          <View>
            <Text className="text-3xl font-semibold text-white">{todayDream?.title}</Text>
            <Text className="text-gray-600">{todayDream?.date}</Text>
          </View>
          <View className="mt-1">
            <View className={`rounded-lg ${todayDream?.lucidity == "partially" ? "bg-yellow-600" : todayDream?.lucidity == "yes" ? "bg-green-600" : "bg-gray-600"} w-16 items-center justify-between`}><Text className={`text-sm ${todayDream?.lucidity === "partially" ? "text-yellow-400" : todayDream?.lucidity === "yes" ? "text-green-400" : "text-gray-400"}`}>{todayDream?.lucidity === "yes" ? "Lucid" : todayDream?.lucidity === "no" ? "No Lucid" : todayDream?.lucidity === "partially" ? "Partially" : ""}</Text></View>
          </View>
          <View className="mt-4">
            <Text className="text-gray-600">{todayDream?.context}</Text>
          </View>
        </View>
      </View>

      {/* Recent dream */}
      <View className="px-5 py-2 mt-5">
        <View><Text className="text-gray-600 font-medium">RECENT DREAMS</Text></View>
        <View className="mt-2 gap-3">
          {recentDreams?.length > 0 ? recentDreams.map((d: any, i: number) => i < 4 ? <List title={d.title} date={d.date} lucidity={d.lucidity} key={i} /> : null) : null}
        </View>
      </View>
    </ScrollView>
  );
}