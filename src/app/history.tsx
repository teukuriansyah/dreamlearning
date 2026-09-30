import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Card from "../components/Card";

const History = () => {
  const [date, setDate] = useState(new Date());
  const [datas,setDatas] = useState()
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const fetchingData = () => {
    const data = localStorage.getData()
    setDatas(data == "No Data" ? [] : JSON.parse(data))
  }

  useEffect(() => {
    fetchingData()
  },[])
  return (
    <ScrollView className="bg-[#081425]">
      {/* Title */}
      <View className="px-5 py-2">
        <Text className="text-2xl font-bold text-white">Dream History</Text>
      </View>

      {/* Date Filter Input Button */}
      <View className="px-5 py-2">
        <View className="bg-[#111C2D] rounded-xl px-5 py-3">
          <View>
            <Text className="text-gray-600 text-sm">Pilih tanggal</Text>
          </View>
          <View>
            <Pressable onPress={() => setShowDatePicker(true)} className="rounded-xl mt-3 bg-[#111C2D] flex-row justify-between items-center active:opacity-80">
              <Text className="text-white font-medium text-lg">{formattedDate}</Text>
            </Pressable>
            {showDatePicker && <DateTimePicker value={date} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onValueChange={onChangeDate} maximumDate={new Date()} />}
          </View>
        </View>
      </View>

      {/* List Dream Today */}
      <View className="px-5 py-2">
        <View>
          <Text className="text-xl font-semibold text-white">Today</Text>
        </View>
        <View className="gap-2 mt-2">
          <Card />
          <Card />
          <Card />
        </View>
      </View>

      {/* List Dream Earlier */}
      <View className="px-5 py-2">
        <View>
          <Text className="text-xl font-semibold text-white">Earlier This Week</Text>
        </View>
        <View className="gap-2 mt-2">
          <Card />
          <Card />
          <Card />
        </View>
      </View>
    </ScrollView>
  );
};

export default History;