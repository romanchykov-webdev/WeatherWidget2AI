import React from 'react';
import {View, Text, Image} from 'react-native';
import {BlurView} from "expo-blur";
import {witherImagesIcon} from "@constants/index";
import iconsWeather from "@constants/iconsWeather";
import {formatTime, shadowStyle} from "@constants/common";

import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated'
import {WeatherResponse} from "../../types/";

interface OtherInfoComponentProps {
    isRefreshingDone: boolean;
    // weatherMainHumidity: WeatherMain | null; // Измените тип здесь
    // timeZone:Timezone;
    weatherOther?: WeatherResponse;
}


const OtherInfo = ({isRefreshingDone, weatherOther}: OtherInfoComponentProps) => {



    // console.log(weatherOther)

    // Безопасная проверка на наличие weatherOther и его полей
    const description = weatherOther?.weather?.[0]?.description || '';
    const humidity = weatherOther?.main?.humidity ?? '';
    const sunrise = weatherOther?.sys?.sunrise ?? 0;
    const sunset = weatherOther?.sys?.sunset ?? 0;
    const timezone = weatherOther?.timezone ?? 0;
    //
    // console.log('description', description)

    return (
        <>
            {
                !isRefreshingDone && (
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
                                                // source={witherImagesIcon[description]}
                                                source={witherImagesIcon[description as keyof typeof witherImagesIcon]}
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
                                            {humidity} %
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
                                                    source={iconsWeather.sunrise}
                                                    resizeMode="cover"
                                                />
                                                <Text
                                                    className="text-white text-center mt-1"
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {formatTime(sunrise, timezone).slice(0,5)}
                                                </Text>
                                            </Animated.View>

                                            {/*sunset*/}
                                            <Animated.View
                                                entering={FadeInDown.delay(1000).springify()}
                                                className="justify-center items-center flex-row">
                                                <Image
                                                    className="w-[20px] h-[20px] mr-5"
                                                    source={iconsWeather.sunset}
                                                    resizeMode="cover"
                                                />
                                                <Text
                                                    className="text-white text-center mt-1"
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {formatTime(sunset, timezone).slice(0,5)}
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
