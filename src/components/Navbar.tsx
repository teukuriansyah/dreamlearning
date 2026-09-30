import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title:string
}

const Navbar = (props: Props) => {
  return (
    <SafeAreaView>
      <View className="px-5">
        <Text className="text-2xl font-semibold">Dream Learning</Text>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;