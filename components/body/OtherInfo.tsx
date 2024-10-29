import React from 'react';
import {View, Text, Image} from 'react-native';
import {BlurView} from "expo-blur";
import {witherImagesIcon} from "@constants/index";
import iconsWeather from "@constants/iconsWeather";
import dayjs from "dayjs";
import {formatTime, shadowStyle} from "@constants/common";

import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated'

interface OtherInfoComponentProps {
    isRefreshingDone: boolean;
}


const OtherInfo = ({isRefreshingDone}: OtherInfoComponentProps) => {

    const sunrise = 1726636384;
    const sunset = 1726680975;
    const timezone = 7200
    const description = "moderate rain"
    const humidity = 60


    return (
        <>
            {
                !isRefreshingDone &&(
                    <Animated.View
                        entering={FadeIn.delay(800).springify()}
                        className="flex-1 mb-5"
                        style={[shadowStyle]}>

                        <BlurView className="flex-1 border-1 border-neutral-500 rounded-xl overflow-hidden p-5 items-center justify-around flex-row gap-2 mb-10
        {/*bg-red-500*/}
        "
                        >
                            {/* Описание */}
                            <View className="flex-1 justify-center items-center">
                                {
                                    !isRefreshingDone && (
                                        <>
                                            <Animated.Image
                                                entering={FadeInUp.delay(1000).springify()}
                                                className="w-[50px] h-[50px] mb-3"
                                                source={witherImagesIcon[description]}
                                                resizeMode="cover"
                                            />
                                            <Animated.Text
                                                entering={FadeInDown.delay(1000).springify()}
                                                className="text-white text-center mt-1"
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {description}
                                            </Animated.Text>
                                        </>
                                    )
                                }

                            </View>

                            {/* Влажность */}
                            <View className="flex-1 justify-center items-center h-full ">
                                {!isRefreshingDone && (
                                    <>
                                        <Animated.Image
                                            entering={FadeInUp.delay(1000).springify()}
                                            className="w-[50px] h-[50px] mb-3"
                                            source={iconsWeather.drop}
                                            resizeMode="cover"
                                        />
                                        <Animated.Text
                                            entering={FadeInDown.delay(1000).springify()}
                                            className="text-white text-center mt-1"
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {humidity}%
                                        </Animated.Text>
                                    </>
                                )
                                }
                            </View>

                            {/* Восход и закат */}
                            <View className="flex-1 justify-around items-center h-full
            {/*bg-red-500*/}
            ">
                                {
                                    !isRefreshingDone && (
                                        <>
                                            {/*sunrise*/}
                                            <Animated.View
                                                entering={FadeInUp.delay(1000).springify()}
                                                className="justify-center items-center flex-row">

                                                <Image
                                                    className="w-[20px] h-[20px] mr-5"
                                                    source={iconsWeather.sunrise} // Иконка для восхода/заката
                                                    resizeMode="cover"
                                                />
                                                <Text
                                                    className="text-white text-center mt-1"
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {formatTime(sunrise, timezone)}
                                                </Text>
                                            </Animated.View>

                                            {/*sunset*/}
                                            <Animated.View
                                                entering={FadeInDown.delay(1000).springify()}
                                                className="justify-center items-center flex-row">
                                                <Image
                                                    className="w-[20px] h-[20px] mr-5"
                                                    source={iconsWeather.sunset} // Иконка для восхода/заката
                                                    resizeMode="cover"
                                                />
                                                <Text
                                                    className="text-white text-center mt-1"
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {formatTime(sunset, timezone)}
                                                </Text>
                                            </Animated.View>
                                        </>
                                    )
                                }


                            </View>

                        </BlurView>
                    </Animated.View>
                )
            }
        </>

    );
};


export default OtherInfo;
