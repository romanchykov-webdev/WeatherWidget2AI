import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Platform} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
// for animated
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing, FadeOut, FadeIn, FadeInRight, FadeInDown, FadeInUp,
} from 'react-native-reanimated';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {paddingApp} from "@constants/common";

// debounce
import {debounce} from 'lodash';
import {fetchCities, fetchForecast} from "@/api";
import SelectCity from "@components/topSection/selectCity";

interface HeaderSearchComponentProps {
    isRefreshingDone: boolean;
    setLocation: (coords: { latitude: number; longitude: number }) => void;
}


const HeaderSearch = ({isRefreshingDone,setLocation}: HeaderSearchComponentProps) => {

    const [searchActive, setSearchActive] = useState(false)
    const [input, setInput] = useState('')

    // search city
    const [cities, setCities] = useState([]);
    useEffect(() => {

    }, [cities]);

    // console.log('cities',cities)

    // const searchweather = async () => {
    //     if (input.length > 2) {
    //         try {
    //             const forecastData = await fetchCities(input);
    //             setCities(forecastData);
    //             console.log('search weather data set in state:', forecastData);
    //         } catch (error) {
    //             console.error('Ошибка при загрузке данных о погоде:', error);
    //         }
    //     }
    // };


    const debouncedFetchCities = useCallback(
        debounce(async (query) => {
            if (query.length > 2) {
                try {
                    const cityData = await fetchCities(query);
                    setCities(cityData);
                    // console.log('cityData', cityData)
                } catch (error) {
                    console.error('Ошибка при загрузке данных о городах:', error);
                }
            }
        }, 500),
        []
    );


    // search city

    // for animated width
    const width = useSharedValue(0);
    const opacity = useSharedValue(0);


    const handleSearch = () => {
        setSearchActive(!searchActive);
        setCities([])
        if (!searchActive) {
            setInput('')

        }

        // Управляем анимацией ширины и прозрачности
        if (searchActive) {
            width.value = withTiming(0, {duration: 500, easing: Easing.ease});
            opacity.value = withTiming(0, {duration: 500, easing: Easing.ease});
        } else {
            width.value = withTiming(paddingApp(), {duration: 500, easing: Easing.ease});
            opacity.value = withTiming(1, {duration: 500, easing: Easing.ease});

        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        width: width.value,
        opacity: opacity.value,
    }));

    const handleTextChange = (value: string) => {
        setInput(value);
        debouncedFetchCities(value);

    };
    // console.log('input',input)

    return (
        <View className=" w-full relative h-[70]
                        {/*bg-red-500*/}
                        ">
            {
                !isRefreshingDone &&
                (
                    <Animated.View
                        entering={FadeInRight.delay(400)}
                        className=" flex-1 flex-row items-center justify-end
                                {/*bg-white*/}
                                ">
                        {/* input   */}

                        <Animated.View
                            style={[animatedStyle, {height: '100%'}]}
                            className="w-full h-full

                                {/*rounded-3xl*/}
                                {/*           bg-red-500*/}
                                           "
                        >

                            <TextInput
                                className=" w-full h-[100%] text-2xl text-white border-2 border-neutral-500 p-5 rounded-full
                                {/*bg-red-500*/}
                                " style={{backgroundColor: 'rgba(0,0,0,0.5)'}}

                                placeholder="Поиск места"
                                placeholderTextColor='grey'

                                value={input}
                                onChangeText={handleTextChange}

                            />
                        </Animated.View>

                        {/*icon*/}
                        <TouchableOpacity
                            onPress={handleSearch}
                            className="absolute right-0 p-5  bg-neutral-500 rounded-full border-2 border-neutral-600"
                        >

                            {
                                searchActive
                                    ? (<FontAwesome name="search-minus" size={24} color="black"/>)
                                    : (<AntDesign name="search1" size={24} color="black"/>)
                            }


                        </TouchableOpacity>

                    </Animated.View>
                )
            }


            {

                cities?.length > 1 && <SelectCity cities={cities} handleSearch={handleSearch} setLocation={setLocation}/>

            }

        </View>
    );
};


export default HeaderSearch;
