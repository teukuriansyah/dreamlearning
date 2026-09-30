import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useState } from "react"

const createDream = () => {
  const [selectedLucidity, setSelectedLucidity] = useState("partially")
  const emotions = ["Happy", "Excited", "Calm", "Confused", "Curious", "Scared"]
  const [selectedEmotions, setSelectedEmotions] = useState([])

  const pickEmotions = (e:string) => {
    const searchEmotions = selectedEmotions.indexOf(e,0)
    if(searchEmotions < 0) {
      setSelectedEmotions([...selectedEmotions,e])
    }
    else {
      setSelectedEmotions(selectedEmotions.filter(d => e != d))
    }
  }
  return (
    <ScrollView className="bg-[#081425]">
      {/* Basic Details */}
      <View className="px-5 py-2">
        <View className="rounded-xl px-5 py-3 bg-[#111C2D]">
          <View>
            <Text className="text-2xl font-bold text-white">Basic Details</Text>
          </View>
          <View className="mt-2">
            <Text className="text-sm text-gray-600">Dream Title</Text>
            <TextInput className="mt-1 rounded-xl text-white px-4 bg-[#081425]"/>
          </View>
        </View>
      </View>

      {/* Story & Chronology */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <View>
            <Text className="text-2xl font-bold text-white">Story & Chronology</Text>
          </View>
          <View className="mt-2">
            <TextInput className="rounded-xl px-4 h-36 bg-[#081425]" multiline textAlignVertical="top"/>
          </View>
        </View>
      </View>

      {/* Lucidity & Awareness */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <View>
            <Text className="text-2xl font-bold text-white">Lucidity & Awareness</Text>
          </View>
          <View className="mt-2">
            <Text className="text-sm text-gray-600">Were you aware that you were dreaming?</Text>
            <View className="bg-[#081425] flex-row justify-between items-center rounded-xl px-5 py-2 mt-2">
              <Pressable onPress={() => setSelectedLucidity("no")} className={`${selectedLucidity == "no" ? "bg-[#111C2D] px-4 py-2 rounded-xl" : "px-4 py-2"}`}><Text className={`${selectedLucidity == "no" ? "text-white" : "text-gray-600"} `}>No</Text></Pressable>
              <Pressable onPress={() => setSelectedLucidity("partially")} className={`${selectedLucidity == "partially" ? "bg-[#111C2D] px-4 py-2 rounded-xl" : "py-2 px-4"}`}><Text className={`${selectedLucidity == "partially" ? "text-white" : "text-gray-600"} `}>Partially</Text></Pressable>
              <Pressable onPress={() => setSelectedLucidity("yes")} className={`${selectedLucidity == "yes" ? "bg-[#111C2D] px-4 py-2 rounded-xl" : "px-4 py-2"}`}><Text className={`${selectedLucidity == "yes" ? "text-white" : "text-gray-600"} `}>Yes</Text></Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* Characteristics */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <View>
            <Text className="text-2xl font-bold text-white">Characteristics</Text>
          </View>
          <View className="mt-2">
            <Text className="text-sm text-gray-600">Dominant Emotions Felt</Text>
            <View>
              <View className="flex-row gap-4 mt-4">
                {emotions.map((d,i) => (i <= 2 ? <Pressable key={i} onPress={() => pickEmotions(d)} className={`rounded-xl ${selectedEmotions.indexOf(d,0) < 0 ? "bg-[#2A3548]" : "bg-[#081425]"} px-5 py-3`}><Text className={`${selectedEmotions.indexOf(d,0) < 0 ? "text-[#38bdf8]" : "text-gray-600"}`}>{d}</Text></Pressable> : null))}
              </View>
              <View className="flex-row gap-4 mt-4">
                {emotions.map((d,i) => (i > 2 ? <Pressable key={i} onPress={() => pickEmotions(d)} className={`rounded-xl ${selectedEmotions.indexOf(d,0) < 0 ? "bg-[#2A3548]" : "bg-[#081425]"} px-5 py-3`}><Text className={`${selectedEmotions.indexOf(d,0) < 0 ? "text-[#38bdf8]" : "text-gray-600"}`}>{d}</Text></Pressable> : null))}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Save button */}
      <View className="px-5 py-2">
        <View className="border rounded-xl bg-[#38bdf8]">
          <Pressable className="items-center px-5 py-3">
            <Text className="font-semibold">Save Dream to Journal</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default createDream;