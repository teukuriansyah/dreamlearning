import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import localStorage from "../../modules/localstorage/src/LocalstorageModule";
import DateTimePicker from '@react-native-community/datetimepicker';
import Card from "../components/Card";

interface DreamData {
  title: string;
  context: string;
  date: string;
  lucidity: string;
  emotions?: string[];
}

const History = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [datas, setDatas] = useState<DreamData[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const fetchingData = () => {
    const data = localStorage.getData();
    if (data && data !== "No Data") {
      try {
        setDatas(JSON.parse(data));
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

  const parseIndonesianDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const months: Record<string, number> = {
      januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
      juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
    };

    const parts = dateString.toLowerCase().trim().split(' ');
    if (parts.length < 3) return null;

    const day = parseInt(parts[0], 10);
    const monthName = parts[1];
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(year) || !(monthName in months)) return null;

    return new Date(year, months[monthName], day);
  };

  const todayDreams = datas.filter((d) => d.date === formattedDate);

  const earlierDreams = datas.filter((d) => {
    if (d.date === formattedDate) return false; // Jangan masukkan tanggal yang sama dengan filter

    const selectedDateObj = new Date(date);
    selectedDateObj.setHours(0, 0, 0, 0);

    const itemDateObj = parseIndonesianDate(d.date);
    if (!itemDateObj) return false;

    itemDateObj.setHours(0, 0, 0, 0);

    return itemDateObj < selectedDateObj;
  });

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
            <Text className="text-gray-400 text-sm">Pilih tanggal</Text>
          </View>
          <View>
            <Pressable 
              onPress={() => setShowDatePicker(true)} 
              className="rounded-xl mt-2 flex-row justify-between items-center active:opacity-80"
            >
              <Text className="text-white font-medium text-lg">{formattedDate}</Text>
            </Pressable>
            
            {showDatePicker && (
              <DateTimePicker 
                value={date} 
                mode="date" 
                display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
                onValueChange={onChangeDate} 
                maximumDate={new Date()} 
              />
            )}
          </View>
        </View>
      </View>

      {/* List Dream Selected Date */}
      <View className="px-5 py-2">
        <View>
          <Text className="text-xl font-semibold text-white">Selected Date ({todayDreams.length})</Text>
        </View>
        <View className="gap-2 mt-2">
          {todayDreams.length > 0 ? (
            todayDreams.map((d, i) => (
              <Card key={i} title={d.title} context={d.context} lucidity={d.lucidity} />
            ))
          ) : (
            <Text className="text-gray-500 italic text-sm">Tidak ada catatan mimpi pada tanggal ini.</Text>
          )}
        </View>
      </View>

      {/* List Dream Earlier */}
      <View className="px-5 py-2 mt-2">
        <View>
          <Text className="text-xl font-semibold text-white">Earlier Logged Dreams</Text>
        </View>
        <View className="gap-2 mt-2 mb-6">
          {earlierDreams.length > 0 ? (
            earlierDreams.map((d, i) => (
              <Card key={i} title={d.title} context={d.context} lucidity={d.lucidity} />
            ))
          ) : (
            <Text className="text-gray-500 italic text-sm">Tidak ada riwayat mimpi sebelumnya.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default History;