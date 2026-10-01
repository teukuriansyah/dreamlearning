import { Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react"
import localStorage from "../../modules/localstorage/src/LocalstorageModule"
import List from "../components/List"

export default function Index() {
  const [datas, setDatas] = useState<any>([])

  const fetchingData = () => {
    const data = localStorage.getData()
    setDatas(data == "No Data" ? [] : JSON.parse(data).reverse())
  }

  useFocusEffect(
      useCallback(() => {
        fetchingData();
      }, [datas])
    );
  return (
    <ScrollView className="bg-[#081425]">
      <View className="px-5 py-2">
        <Text className="text-xl font-semibold text-white">Good Morning, Code Number 9</Text>
      </View>

      {/* Today's entry */}
      <View className="px-5 py-2">
        <View>
          <Text className="text-gray-600 font-medium">TODAY'S ENTRY</Text>
        </View>
        <View className="bg-[#111C2D] rounded-xl px-6 py-4 mt-2 ">
          <View>
            <Text className="text-3xl font-semibold text-white">{datas[0]?.title}</Text>
            <Text className="text-gray-600">{datas[0]?.date}</Text>
          </View>
          <View className="mt-1">
            <View className={`${datas[0]?.lucidity == "partially" ? "bg-yellow-600" : datas[0]?.lucidity == "yes" ? "bg-green-600" : null} w-16 items-center rounded-xl justify-between`}><Text className={`text-sm ${datas[0]?.lucidity === "partially" ? "text-yellow-400" : datas[0]?.lucidity === "yes" ? "text-green-400" : null}`}>{datas[0]?.lucidity === "yes" ? "Lucid" : datas[0]?.lucidity === "no" ? "No Lucid" : datas[0]?.lucidity === "partially" ? "Partially" : ""}</Text></View>
          </View>
          <View className="mt-4">
            <Text className="text-gray-600">{datas[0]?.context}</Text>
          </View>
        </View>
      </View>

      {/* Recent dream */}
      <View className="px-5 py-2 mt-5">
        <View>
          <Text className="text-gray-600 font-medium">RECENT DREAMS</Text>
        </View>
        <View className="mt-2 gap-3">
          {datas?.length > 1 ? datas.map((d:any,i:number) => (i > 0 && i < 5) ? <List title={d.title} date={d.date} lucidity={d.lucidity} key={i} /> : null) : null}
        </View>
      </View>
    </ScrollView>
  );
}