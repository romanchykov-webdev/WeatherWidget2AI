import React from 'react';
import {View, Text} from 'react-native';
import { shadowStyle, wp} from "@constants/common";
import {BlurView} from "expo-blur";
import {AntDesign} from "@expo/vector-icons";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated'

// Объявите тип для пропсов
interface TempComponentProps {
    tempType: boolean; // или используйте типизацию, которая соответствует вашим данным
    isRefreshingDone:boolean;
}

const TempComponent = ({tempType,isRefreshingDone}:TempComponentProps) => {
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
                            className="flex-row relative justify-center">
                            <Text
                                className="text-white items-center justify-center text-center font-bold "
                                style={{
                                    fontSize: wp(40),
                                    // text shadow
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)', // цвет тени
                                    textShadowOffset: {width: 2, height: 2}, // смещение тени
                                    textShadowRadius: 3, // радиус размытия тени
                                }}
                            >20</Text>
                            <Text className="text-2xl self-center mb-16 text-white"
                            >{tempType ?'°C' :'℉'}</Text>

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
                                    17 °
                                </Text>
                                {/*max temp*/}
                                <Text className="text-2xl ml-5 text-neutral-300">
                                    <AntDesign name="arrowdown" size={14} color="white"/>
                                    25 °
                                </Text>

                            </BlurView>
                        </Animated.View>
                    </>
                )
            }






        </View>
    );
};



export default TempComponent;
