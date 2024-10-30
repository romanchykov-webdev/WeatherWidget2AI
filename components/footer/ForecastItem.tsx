import React from 'react';
import {View, Text, Image,StyleSheet} from 'react-native';
import {iconsWeather} from "@constants/index";
import {BlurView} from "expo-blur";
import {AntDesign} from "@expo/vector-icons";
import {formatTime, platform, shadowStyle} from "@constants/common";

import Animated, {FadeInRight} from 'react-native-reanimated'


const ForecastItem = ({}) => {

    const sunrise = 1726636384;
    const sunset = 1726680975;
    const timezone = 7200


    return (

                <View

                    className="
            {/*bg-red-500*/}
            "
                    style={[shadowStyle]}>

                    <BlurView intensity={10}
                              className={`p-5  justify-center    rounded-2xl overflow-hidden relative ${platform ? '' : `border-2 border-neutral-500`}`}

                    >

                        {/* Имитация overlay через дополнительный View */}
                        <View className="absolute bg-red-500 w-[150%] h-[150%] top-0 bottom-0 left-0 right-0" style={{backgroundColor:'rgba(0,0,0, 0.2)'}} />
                        {/*image*/}
                        <View className=" mb-5 justify-center items-center">
                            <View className="p-5 bg-neutral-500 rounded-full">
                                <Image
                                    className="w-10 h-10"
                                    source={iconsWeather.sun}
                                />
                            </View>

                        </View>

                        {/*temp*/}
                        <View className="flex-row mb-5">
                            <Text className="text-white text-xl mr-5">
                                <AntDesign name="arrowup" size={14} color="white"/>
                                25 °
                            </Text>
                            <Text className="text-white text-xl">
                                <AntDesign name="arrowdown" size={14} color="white"/>
                                19 °
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
                                        source={iconsWeather.sunrise} // Иконка для восхода/заката
                                        resizeMode="cover"
                                    />
                                    <Text
                                        className="text-white text-center
                                {/*bg-red-500*/}
                                "
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {formatTime(sunrise, timezone)}
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
                                        {formatTime(sunset, timezone)}
                                    </Text>
                                </BlurView>
                            </View>

                        </View>
                    </BlurView>
                </View>



    );
};


export default ForecastItem;
