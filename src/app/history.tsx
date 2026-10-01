import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import localStorage from "../../modules/localstorage/src/LocalstorageModule";
import DateTimePicker from '@react-native-community/datetimepicker';
import Card from "../components/Card";

const History = () => {
  const [date, setDate] = useState(new Date());
  const [datas, setDatas] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const fetchingData = () => {
    const data = localStorage.getData();
    setDatas(data == "No Data" ? [] : JSON.parse(data));
  };

  useFocusEffect(
    useCallback(() => {
      fetchingData();
    }, [datas])
  );

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
          {datas.map((d:any,i:number) => formattedDate === d.date ? <Card title={d.title} context={d.context} lucidity={d.lucidity}/> : null)}
        </View>
      </View>

      {/* List Dream Earlier */}
      <View className="px-5 py-2">
        <View>
          <Text className="text-xl font-semibold text-white">Earlier This Week</Text>
        </View>
        <View className="gap-2 mt-2">
          {datas.map((d: any, i: number) => {
            if (!d.date) return null;

            const months: Record<string, number> = {
              januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
              juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
            };

            const today = new Date();
            today.setHours(23, 59, 59, 999);

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);
            sevenDaysAgo.setHours(0, 0, 0, 0);

            const [day, monthName, year] = d.date.toLowerCase().split(' ');
            const itemDate = new Date(Number(year), months[monthName], Number(day));

            const isWithinLast7Days = itemDate >= sevenDaysAgo && itemDate <= today;

            return isWithinLast7Days ? (
              <Card key={i} title={d.title} context={d.context} lucidity={d.lucidity} />
            ) : null;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default History;
