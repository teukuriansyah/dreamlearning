import { ScrollView, View, Text } from 'react-native';
import { useState, useCallback } from "react";
import { useFocusEffect } from 'expo-router';
import localStorage from "../../modules/localstorage/src/LocalstorageModule";
import DonutChart from '@/components/DonutChart';

export interface ChartDataItem {
  key:string;
  label: string;
  value: number;
  color: string;
}

const Insight = () => {
  const [datas, setDatas] = useState<ChartDataItem[]>([]);

  const fetchingData = useCallback(() => {
    const rawData = localStorage.getData();

    if (rawData && rawData !== "No Data") {
      try {
        const parsedData: any[] = JSON.parse(rawData);

        const noLucidCount = parsedData.filter((d) => d.lucidity === "no").length;
        const lucidCount = parsedData.filter((d) => d.lucidity === "yes").length;
        const partiallyLucidCount = parsedData.filter((d) => d.lucidity === "partially").length;

        const chartData: ChartDataItem[] = [
          { key:"", label: "No Lucid", value: noLucidCount, color: "#1E293B" },
          { key:"", label: "Lucid", value: lucidCount, color: "#16A34A" },
          { key:"", label: "Partially", value: partiallyLucidCount, color: "#CA8A04" },
        ];

        setDatas(chartData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setDatas([]);
      }
    } else {
      setDatas([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchingData();
    }, [fetchingData])
  );

  return (
    <ScrollView className="bg-[#081425] flex-1">
      <View className="px-5 py-3">
        <View className="bg-[#111C2D] px-5 py-4 rounded-xl">
          <Text className="text-white font-bold text-3xl mb-5">Lucidity Trend</Text>
          <DonutChart data={datas} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Insight;