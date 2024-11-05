import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CityItem from "@components/topSection/CityItem";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing, FadeOut, FadeIn, FadeInRight, FadeInDown, FadeInUp,
} from 'react-native-reanimated';
import {shadowStyle} from "@constants/common";

// Определите тип для объекта города
interface City {
    id:number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    sys: {
        country: string; // Или можете использовать CountryCode, если вы его определили
    };
}

interface SelectCityProps {
    cities: City[]; // Указываем, что cities — это массив объектов типа City
    handleSearch:()=>void
    setLocation: (coords: { latitude: number; longitude: number }) => void;
}

const SelectCity = ({cities,handleSearch,setLocation}: SelectCityProps) => {
    // console.log('cities',cities)

    const [city, setCity] = useState<City[]>([])


    function filterUniqueCities(cities: City[]) {
        const uniqueCities: City[] = [];

        cities.forEach(city => {
            // Проверяем, есть ли уже в массиве запись с таким же названием и координатами
            const isDuplicate = uniqueCities.some(uniqueCity =>
                uniqueCity.name === city.name &&
                uniqueCity.coord.lat === city.coord.lat &&
                uniqueCity.coord.lon === city.coord.lon
            );

            // Если дубликата нет, добавляем запись в массив уникальных городов
            if (!isDuplicate) {
                uniqueCities.push(city);
            }
        });
        setCity(uniqueCities)
        // return uniqueCities;
    }

    useEffect(() => {
        filterUniqueCities(cities);
    }, [cities]);
    // console.log('city',city)

    return (
        <Animated.View
            key={cities.length}
            entering={FadeInUp.springify()}
            className=" absolute top-20 w-full rounded-xl
             "
            style={[shadowStyle,{backgroundColor:'rgba(0,0,0,0.2)'}]}
        >

            {
                city?.map((item,index) => {
                    return (
                        <CityItem key={index} item={item} handleSearch={handleSearch} setLocation={setLocation}/>
                    )
                })
            }
        </Animated.View>
    );
};

const styles = StyleSheet.create({})

export default SelectCity;
