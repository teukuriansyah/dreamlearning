import { View, Text } from 'react-native';

interface Props {
  title:string;
  context:string;
  lucidity:string
}

const Card = (props: Props) => {
  return (
    <View className="rounded-xl px-5 py-2 bg-[#111C2D]">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold text-white">{props.title}</Text>
        <View className={`${props.lucidity == "partially" ? "bg-yellow-600" : props.lucidity == "yes" ? "bg-green-600" : null} w-16 items-center rounded-xl justify-between`}><Text className={`text-sm ${props.lucidity === "partially" ? "text-yellow-400" : props.lucidity === "yes" ? "text-green-400" : null}`}>{props.lucidity === "yes" ? "Lucid" : props.lucidity === "no" ? "No Lucid" : props.lucidity === "partially" ? "Partially" : ""}</Text></View>
      </View>
      <View>
        <Text className="text-gray-600">{props.context}</Text>
      </View>
    </View>
  );
};

export default Card;