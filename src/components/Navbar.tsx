import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Navbar = () => {
  return (
    <SafeAreaView className="bg-[#081425] shadow-xl shadow-black">
      <View className="px-5">
        <Text className="text-3xl font-semibold text-[#38bdf8]">Dream Learning</Text>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;