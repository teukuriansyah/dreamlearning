import { View, Text, TextInput, ScrollView, Pressable, Platform } from 'react-native';
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import localStorage from "../../modules/localstorage/src/LocalstorageModule"
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateDream = () => {
  const route = useRouter()
  const emotions = ["Happy", "Excited", "Calm", "Confused", "Curious", "Scared"];
  const [title, onChangeTitle] = useState<string>("")
  const [context, onChangeContext] = useState<string>("")
  const [datas, setDatas] = useState("")
  const [selectedLucidity, setSelectedLucidity] = useState("partially");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickEmotions = (e: string) => {
    if (selectedEmotions.includes(e)) {
      setSelectedEmotions(selectedEmotions.filter((d) => d !== e));
    } else {
      setSelectedEmotions([...selectedEmotions, e]);
    }
  };

  const postData = () => {
    const payload = {title,context,date:formattedDate,lucidity:selectedLucidity,emotions:selectedEmotions}
    localStorage.postData(JSON.stringify([...datas,payload]))
    onChangeTitle("")
    onChangeContext("")
    setSelectedEmotions([])
    setSelectedLucidity("partially")
    route.back()
  }

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const fetchingData = () => {
    const data = localStorage.getData()
    setDatas(data == "No Data" ? [] : JSON.parse(data))
  }

  const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    fetchingData()
  },[])
  return (
    <ScrollView className="bg-[#081425]">
      {/* Basic Details */}
      <View className="px-5 py-2">
        <View className="rounded-xl px-5 py-3 bg-[#111C2D]">
          <Text className="text-2xl font-bold text-white">Basic Details</Text>
          <View className="mt-2">
            <Text className="text-sm text-gray-400">Dream Title</Text>
            <TextInput className="mt-1 rounded-xl text-white px-4 py-2 bg-[#081425]" value={title} onChangeText={onChangeTitle} placeholder="Title" placeholderTextColor="#4B5563"/>
          </View>
          <View className="mt-3 bg-[#081425] rounded-xl px-4 py-3 ">
            <Text className="text-sm text-gray-400">Date</Text>
            <Pressable onPress={() => setShowDatePicker(true)} className="mt-1 py-2 rounded-xl flex-row justify-between items-center active:opacity-80">
              <Text className="text-white font-medium text-lg">{formattedDate}</Text>
            </Pressable>
            {showDatePicker && <DateTimePicker value={date} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onValueChange={onChangeDate} maximumDate={new Date()} />}
          </View>
        </View>
      </View>

      {/* Story & Chronology */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <Text className="text-2xl font-bold text-white">Story & Chronology</Text>
          <View className="mt-2">
            <TextInput className="rounded-xl px-4 py-2 text-white h-44 bg-[#081425]" multiline textAlignVertical="top" value={context} onChangeText={onChangeContext} placeholder="Story & Chronology" placeholderTextColor="#4B5563"/>
          </View>
        </View>
      </View>

      {/* Lucidity & Awareness */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <Text className="text-2xl font-bold text-white">Lucidity & Awareness</Text>
          <View className="mt-2">
            <Text className="text-sm text-gray-400">Were you aware that you were dreaming?</Text>
            <View className="bg-[#081425] flex-row justify-between items-center rounded-xl p-1 mt-2">
              {["no", "partially", "yes"].map((option) => (
                <Pressable key={option} onPress={() => setSelectedLucidity(option)} className={`px-4 py-2 rounded-xl flex-1 items-center ${selectedLucidity === option ? "bg-[#111C2D]" : ""}`}>
                  <Text className={`capitalize ${selectedLucidity === option ? "text-white font-semibold" : "text-gray-400"}`}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Characteristics */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <Text className="text-2xl font-bold text-white">Characteristics</Text>
          <View className="mt-2">
            <Text className="text-sm text-gray-400 mb-3">Dominant Emotions Felt</Text>
            <View className="flex-row flex-wrap gap-2">
              {emotions.map((emotion) => (
                <Pressable key={emotion} onPress={() => pickEmotions(emotion)} className={`rounded-xl px-4 py-2.5 border ${selectedEmotions.includes(emotion) ? "bg-[#2A3548] border-[#38bdf8]" : "bg-[#081425] border-transparent"}`}>
                  <Text className={selectedEmotions.includes(emotion) ? "text-[#38bdf8] font-medium" : "text-gray-400"}>{emotion}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View className="px-5 py-4">
        <Pressable onPress={() => postData()}className="items-center px-5 py-3.5 rounded-xl bg-[#38bdf8] active:opacity-80">
          <Text className="font-semibold text-[#081425] text-base">Save Dream to Journal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CreateDream;