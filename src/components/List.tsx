import { View, Text } from 'react-native';

interface Props {
  // Define your props here
}

const List = (props: Props) => {
  return (
    <View className="rounded-xl px-5 py-2 gap-2 bg-[#111C2D]">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold text-white">FirstTab</Text>
        <Text className="text-sm text-gray-600">tanggal</Text>
      </View>
      <View>
        <Text className="text-sm">Lucid</Text>
      </View>
    </View>
  );
};

export default List;