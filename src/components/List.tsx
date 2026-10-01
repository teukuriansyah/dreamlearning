import { View, Text } from 'react-native';

interface Props {
  title:string;
  date:string;
  lucidity:string;
}

const List = (props: Props) => {
  return (
    <View className="rounded-xl px-5 py-2 gap-2 bg-[#111C2D]">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold text-white">{props.title}</Text>
        <Text className="text-sm text-gray-600">{props.date}</Text>
      </View>
      <View>
        <View className={`${props.lucidity == "partially" ? "bg-yellow-600" : props.lucidity == "yes" ? "bg-green-600" : "bg-gray-600"} w-16 items-center rounded-xl justify-between`}><Text className={`text-sm ${props.lucidity === "partially" ? "text-yellow-400" : props.lucidity === "yes" ? "text-green-400" : "text-gray-400"}`}>{props.lucidity === "yes" ? "Lucid" : props.lucidity === "no" ? "No Lucid" : props.lucidity === "partially" ? "Partially" : ""}</Text></View>
      </View>
    </View>
  );
};

export default List;