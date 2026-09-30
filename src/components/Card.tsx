import { View, Text } from 'react-native';

interface Props {
  // Define your props here
}

const Card = (props: Props) => {
  return (
    <View className="rounded-xl px-5 py-2 bg-[#111C2D]">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold text-white">Title</Text>
        <Text className="text-sm">Lucid</Text>
      </View>
      <View>
        <Text className="text-gray-600">context</Text>
      </View>
    </View>
  );
};

export default Card;