import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateJournalNavbar = () => {
  return (
    <SafeAreaView className="bg-[#081425] shadow-xl shadow-black">
      <View className="px-5 flex-row gap-3 items-center">
        <Link href={"/"}>
            <Ionicons name='arrow-back' size={24} color={"#38bdf8"}/>
        </Link>
        <View>
            <Text className="text-2xl font-bold text-[#38bdf8]">Create Journal</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateJournalNavbar;