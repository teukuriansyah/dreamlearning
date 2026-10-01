import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

export interface ChartDataItem {
  key: any;
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartDataItem[];
  radius?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  radius = 90,
  strokeWidth = 22,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  let accumulatedAngle = 0;

  return (
    <View className="items-center justify-center p-4">
      {/* Container Grafik & Teks Tengah */}
      <View className="items-center justify-center relative">
        <Svg
          height={radius * 2}
          width={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          {/* G dengan rotasi -90 derajat agar lingkaran mulai dari jam 12 */}
          <G rotation="-90" origin={`${radius}, ${radius}`}>
            {data.map((item, index) => {
              const sliceLength = (item.value / total) * circumference;
              const gapLength = circumference - sliceLength;
              const currentRotation = accumulatedAngle;

              // Tambahkan sudut untuk variabel berikutnya
              accumulatedAngle += (item.value / total) * 360;

              return (
                <Circle
                  key={item.key || index}
                  cx={radius}
                  cy={radius}
                  r={innerRadius}
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${sliceLength} ${gapLength}`}
                  strokeDashoffset={0}
                  strokeLinecap="butt"
                  fill="transparent"
                  rotation={currentRotation}
                  origin={`${radius}, ${radius}`}
                />
              );
            })}
          </G>
        </Svg>

        {/* Total Nilai di Tengah Lingkaran */}
        <View className="absolute items-center justify-center">
          <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total
          </Text>
          <Text className="text-3xl font-extrabold text-[#38bdf8]">
            {total.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Legend / Keterangan 3 Variabel */}
      <View className="mt-6 w-full max-w-xs space-y-3 gap-2">
        {data.map((item,i) => (
          <View
            key={i}
            className="flex-row items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
          >
            <View className="flex-row items-center space-x-3 gap-2">
              <View
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Text className="text-sm font-medium text-gray-700">
                {item.label}
              </Text>
            </View>
            <Text className="text-sm font-bold text-gray-900">
              {item.value.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DonutChart