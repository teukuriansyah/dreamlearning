import { View, Text, ScrollView } from 'react-native';

const settings = () => {
  return (
    <ScrollView className="bg-[#081425]">
      <View className="px-5 py-2">
        <View className="rounded-xl px-6 py-4 bg-[#111C2D]">
          <Text className="text-xl font-semibold text-white">Offline Sanctuary</Text>
          <Text className="mt-1 text-sm text-gray-600">Jetpack DataStore & Room SQLite architecture. Zero telemetry, network, or server sync.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default settings;