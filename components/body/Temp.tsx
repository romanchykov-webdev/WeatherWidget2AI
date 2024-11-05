import React from 'react';
import {View, Text} from 'react-native';
import {shadowStyle, wp} from "@constants/common";
import {BlurView} from "expo-blur";
import {AntDesign} from "@expo/vector-icons";
import Animated, { FadeInUp} from 'react-native-reanimated'
import ChangeTemp from "@components/changeTemp";
import {WeatherMain} from "../../types";

// Объявите тип для пропсов
interface TempComponentProps {
    tempType: boolean; // или используйте типизацию, которая соответствует вашим данным
    isRefreshingDone: boolean;
    // changeTemp:()=>void;
    weatherMain: WeatherMain | null; // Измените тип здесь
}

const TempComponent = ({tempType, isRefreshingDone,weatherMain}: TempComponentProps) => {

    // console.log('weatherMain',weatherMain)
    return (
        <View className="flex-1 mb-5
    {/*bg-red-500*/}
    ">
            {
                !isRefreshingDone && (
                    <>
                        {/*?general temp*/}
                        <Animated.View
                            entering={FadeInUp.delay(600)}
                            className="flex-row relative justify-center
                            {/*border-2*/}
                            {/*border-red-500*/}
                            ">
                            <Text
                                className="text-white items-center justify-center text-center font-bold "
                                style={{
                                    fontSize: wp(40),
                                    // text shadow
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)', // цвет тени
                                    textShadowOffset: {width: 2, height: 2}, // смещение тени
                                    textShadowRadius: 3, // радиус размытия тени
                                }}
                            >
                                {weatherMain ? Math.round(weatherMain.temp) : ''}
                            </Text>
                            <Text className="text-2xl self-center mb-16 text-white absolute right-[20] top-[20]
                            {/*bg-red-500*/}
                            "
                            >{tempType ? '°C' : '℉'}</Text>

                        </Animated.View>

                        {/*    min max temp */}
                        <Animated.View
                            entering={FadeInUp.delay(800)}
                            className="justify-center items-center relative top-[-20]"
                            style={[shadowStyle]}

                        >
                            <BlurView
                                className="flex-row pl-5 pr-5 pt-2 pb-2 rounded-full border-1 border-neutral-500 overflow-hidden
                    bg-red-500
                    "
                                style={[shadowStyle]}
                            >
                                {/*min temp*/}
                                <Text className="text-2xl text-neutral-300">
                                    <AntDesign name="arrowup" size={14} color="white"/>
                                    {weatherMain ? Math.round(weatherMain.temp_max) : ''} °
                                </Text>
                                {/*max temp*/}
                                <Text className="text-2xl ml-5 text-neutral-300">
                                    <AntDesign name="arrowdown" size={14} color="white"/>
                                    {weatherMain ? Math.round(weatherMain.temp_min) : ''} °
                                </Text>

                            </BlurView>
                        </Animated.View>

                        {/*change temp c F*/}
                        <Animated.View
                            entering={FadeInUp.delay(900)}
                            className="justify-center items-center "
                        >
                            {/*<ChangeTemp tempType={tempType} changeTemp={changeTemp}/>*/}


                        </Animated.View>
                    </>
                )
            }


        </View>
    );
};


export default TempComponent;
