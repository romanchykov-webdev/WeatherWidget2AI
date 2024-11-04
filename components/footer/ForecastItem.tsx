import React from 'react';
import {View, Text, Image} from 'react-native';
import {iconsWeather, witherImagesIcon} from "@constants/index";
import {BlurView} from "expo-blur";
import {AntDesign} from "@expo/vector-icons";
import {
    formattedDateDay,
    formatTime,
    platform,
    shadowStyle
} from "@constants/common";



const ForecastItem = ({forecastData,}: { forecastData: any, }) => {


    if (!forecastData) {
        return null;
    }



    const {temp_min, temp_max} = forecastData.main;
    const {dt_txt} = forecastData;
    const {sunrise, sunset, timezone} = forecastData
    const {description} = forecastData.weather[0];

    // console.log('dt_txt', formattedDateDay(dt_txt))

    return (

        <View className=""
              style={[shadowStyle]}>


            <BlurView intensity={10}
                      className={`p-5  justify-center    rounded-2xl overflow-hidden relative ${platform ? '' : `border-2 border-neutral-500`}`}

            >

                {/* Имитация overlay через дополнительный View */}
                <View className="absolute bg-red-500 w-[150%] h-[150%] top-0 bottom-0 left-0 right-0"
                      style={{backgroundColor: 'rgba(0,0,0, 0.2)'}}/>
                {/*image*/}
                <View className=" mb-5 justify-center items-center">
                    {/*data */}
                    <View className="flex-row mb-2">
                        <Text className="text-white text-lg capitalize">{formattedDateDay(dt_txt)}</Text>

                    </View>

                    {/*image*/}
                    <View className="p-5 bg-neutral-500 rounded-full">
                        <Image
                            className="w-10 h-10"
                            source={witherImagesIcon[description as keyof typeof witherImagesIcon]}
                            resizeMode="cover"
                        />
                    </View>

                </View>

                {/*temp*/}
                <View className="flex-row mb-5 justify-center">
                    <Text className="text-white text-xl mr-5">
                        <AntDesign name="arrowup" size={14} color="white"/>
                        {/*sunrise, sunset, timezone*/}
                        {Math.round(temp_max)}
                        °
                    </Text>
                    <Text className="text-white text-xl">
                        <AntDesign name="arrowdown" size={14} color="white"/>
                        {Math.round(temp_min)}
                        °
                    </Text>
                </View>

                {/* Восход и закат */}
                <View className=" justify-between items-center flex-cel
                {/*h[200]*/}
                {/*bg-red-500*/}
                ">
                    <View className="
                    {/*bg-red-500*/}
                    ">
                        <BlurView intensity={20} className="flex-row mb-2  p-2 rounded-2xl overflow-hidden ">
                            <Image
                                className="w-[20px] h-[20px] mr-5"
                                // source={iconsWeather.sunrise} // Иконка для восхода/заката
                                source={witherImagesIcon[description as keyof typeof witherImagesIcon]}
                                resizeMode="cover"
                            />
                            <Text
                                className="text-white text-center
                                {/*bg-red-500*/}
                                "
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {formatTime(sunrise, timezone).slice(0, 5)}
                            </Text>
                        </BlurView>

                    </View>
                    <View className="
                    {/*bg-red-500*/}
                    ">
                        <BlurView intensity={20} className=" flex-row  p-2 rounded-2xl overflow-hidden ">
                            <Image
                                className="w-[20px] h-[20px] mr-5"
                                source={iconsWeather.sunset} // Иконка для восхода/заката
                                resizeMode="cover"
                            />
                            <Text
                                className="text-white text-center"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {formatTime(sunset, timezone).slice(0, 5)}
                            </Text>
                        </BlurView>
                    </View>

                </View>
            </BlurView>


        </View>


    );
};


export default ForecastItem;
