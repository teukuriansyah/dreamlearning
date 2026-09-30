import { View, Text, ScrollView } from 'react-native';
import Card from "../components/Card.tsx"

const history = () => {
  return (
    <ScrollView className="bg-[#081425]">
      <View className="px-5 py-2">
        <Text className="text-2xl font-bold text-white">Dream History</Text>
      </View>

      {/* List Dream Today*/}
      <View className="px-5 py-2">
        <View>
          <Text className="text-xl font-semibold text-white">Tanggal</Text>
        </View>
        <View className="gap-2 mt-2">
          <Card/>
          <Card/>
          <Card/>
        </View>
      </View>
      
      {/* List Dream Earlier*/}
      <View className="px-5 py-2">
        <View>
          <Text className="text-xl font-semibold text-white">Earlier This Week</Text>
        </View>
        <View className="gap-2 mt-2">
          <Card/>
          <Card/>
          <Card/>
        </View>
      </View>
    </ScrollView>
  );
};

export default history;