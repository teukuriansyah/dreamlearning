import { Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react"
import localStorage from "../../modules/localStorage/src/LocalstorageModule"
import List from "../components/List"

export default function Index() {
  const [datas, setDatas] = useState()

  const fetchingData = () => {
    const data = localStorage.getData()
    setDatas(data == "No Data" ? [] : JSON.parse(data))
  }

  useEffect(() => {
    fetchingData()
  },[])
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
            <Text className="text-3xl font-semibold text-white">Title</Text>
            <Text className="text-gray-600">Tanggal</Text>
          </View>
          <View className="mt-1">
            <Text className="text-sm">Lucid</Text>
          </View>
          <View className="mt-4">
            <Text className="text-gray-600">Context</Text>
          </View>
        </View>
      </View>

      {/* Recent dream */}
      <View className="px-5 py-2 mt-5">
        <View>
          <Text className="text-gray-600 font-medium">RECENT DREAMS</Text>
        </View>
        <View className="mt-2 gap-3">
          <List />
          <List />
          <List />
        </View>
      </View>
    </ScrollView>
  );
}