import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {cityCode} from "@constants/cityCode";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {shadowStyle} from "@constants/common";

// Определите тип для cityCode
interface CityItemProps {
    item: {
        coord: {
            lat: number,
            lon: number
        };
        name: string;
        sys: {
            country: string; // country будет строкой, которая сопоставляется с ключами в cityCode
        };
    };
    handleSearch:()=>void
    setLocation: (coords: { latitude: number; longitude: number }) => void;
}

const CityItem = ({item,handleSearch,setLocation}:CityItemProps) => {

    // console.log('item', item)
    const countryName = cityCode[item.sys.country as keyof typeof cityCode]; // Извлекаем полное название страны
    // console.log('countryName',countryName)

    const handlerCity=()=>{
        // "coord": {"lat": 50.4333, "lon": 30.5167},

        // console.log('item.coord.lat',item.coord.lat)
        // console.log('item.coord.lon',item.coord.lon)
        // {"latitude": 45.69051365794817, "longitude": 12.710834225861419}
        setLocation({ latitude: item.coord.lat, longitude: item.coord.lon });
        handleSearch()
    }

  return (
    <View className="
     rounded-xl p-5  m-2 bg-neutral-500
    {/*bg-red-500*/}
    "
    style={[shadowStyle]}
    >
        <TouchableOpacity className="flex-row justify-start items-center overflow-hidden"
                          onPress={handlerCity}

        >
            <FontAwesome name="map-marker" size={24} color="white" className="mr-5"/>
            <Text   className="text-white text-2xl capitalize">{item.name} {' '}</Text>
            <Text className="text-white text-2xl capitalize">{countryName}</Text>
        </TouchableOpacity>
     
    </View>
  );
};



export default CityItem;
