import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ImageBackground, Switch, TouchableOpacity} from 'react-native';
import LanguageSelector from "@components/botomSheet/LanguageSelector";
import imagesBg from "@constants/imagesBg";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import {AntDesign} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";



interface BottomSheetProps {
    tempType:boolean;
    changeTemp:()=>void
    handleCloseModalPress: () => void; // Добавляем новый пропс

}

const BottomSheetItem = ({handleCloseModalPress,changeTemp,tempType}:BottomSheetProps) => {



    // Анимации для размеров и цвета текста активного элемента температуры

    useEffect(() => {
        setIsEnabled(tempType);
    }, [tempType]);

    const [isEnabled, setIsEnabled] = useState(tempType);
    const toggleSwitchTemp = () => {
        changeTemp()
        setIsEnabled(previousState => !previousState)

    };
    
    const animatedStyleCelsius = useAnimatedStyle(() => ({
        fontSize: withTiming(!isEnabled ? 24 : 32, { duration: 300 }),
        // color: isEnabled ? 'white' : '#FFD700',
        color: isEnabled ? '#FFD700' : 'white',
    }));

    const animatedStyleFahrenheit = useAnimatedStyle(() => ({
        fontSize: withTiming(!isEnabled ? 32 : 24, { duration: 300 }),
        // color: isEnabled ? '#FFD700' : 'white',
        color: isEnabled ? 'white' : '#FFD700',
    }));

    // Анимации для размеров и цвета текста активного элемента скорости
    // const [isEnabledSpeed, setIsEnabledSpeed] = useState(false);
    // const toggleSwitchSpeed = () => setIsEnabledSpeed(previousState => !previousState);
    //
    // const animatedStyleKm = useAnimatedStyle(() => ({
    //     fontSize: withTiming(isEnabledSpeed ? 24 : 32, { duration: 300 }),
    //     color: isEnabledSpeed ? 'white' : '#FFD700',
    // }));
    //
    // const animatedStyleMh = useAnimatedStyle(() => ({
    //     fontSize: withTiming(isEnabledSpeed ? 32 : 24, { duration: 300 }),
    //     color: isEnabledSpeed ? '#FFD700' : 'white',
    // }));

    // translate
    const { t, i18n } = useTranslation(); // получаем функции перевода

    return (
        <SafeAreaView className="p-5 pt-12 flex-1 flex-col justify-between
        bg-red-500
        ">
            <ImageBackground
                source={imagesBg.bgSetting}
                className="top-0 bottom-0 left-0 right-0 flex-1 absolute "
                resizeMode='cover'
            />
            <View className="flex-1 absolute top-0 bottom-0 left-0 right-0
            {/*bg-red-500*/}
            "
                  style={{backgroundColor: 'rgba(0,0,0,0.7)'}}
            />


            {/*settings*/}
            <View>

                {/*top menu*/}
                <View className="flex-row items-center justify-start mb-12">
                    <TouchableOpacity
                        className="ml-5"
                        onPress={handleCloseModalPress}
                    >
                        <AntDesign name="home" size={40} color="white" />
                    </TouchableOpacity>
                </View>

                <Text className="text-white">{t('welcome')}</Text>

                {/*LanguageSelector*/}
                <View className="flex-row items-center mb-5 justify-between">
                    <Text className="text-2xl text-white">Change language: </Text>
                    <LanguageSelector/>
                </View>

                {/*Temp Selector*/}
                <View className="flex-row items-center mb-5 justify-between">
                    <Text className="text-2xl text-white">Temperature: </Text>

                    <View className="flex-row items-center ml-10">
                        <Animated.Text className="text-white mr-5"
                                       style={[ animatedStyleCelsius]}
                        >°C</Animated.Text>
                        <Switch
                            className=""
                            trackColor={{false: '#767577', true: '#767577'}}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f5dd4b'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchTemp}
                            value={!isEnabled}
                        />
                        <Animated.Text  className="text-white ml-5"
                                        style={[ animatedStyleFahrenheit]}
                        >°F</Animated.Text>
                    </View>

                </View>

                {/*km mh Selector*/}
                {/*<View className="flex-row items-center mb-5 justify-between">*/}
                {/*    <Text className="text-2xl text-white">Speed: </Text>*/}

                {/*    <View className="flex-row items-center ml-10">*/}
                {/*        <Animated.Text className="text-white mr-5"*/}
                {/*                       style={[ animatedStyleKm]}*/}
                {/*        >Km</Animated.Text>*/}
                {/*        <Switch*/}
                {/*            className=""*/}
                {/*            trackColor={{false: '#767577', true: '#767577'}}*/}
                {/*            thumbColor={isEnabled ? '#f5dd4b' : '#f5dd4b'}*/}
                {/*            ios_backgroundColor="#3e3e3e"*/}
                {/*            onValueChange={toggleSwitchSpeed}*/}
                {/*            value={isEnabledSpeed}*/}
                {/*        />*/}
                {/*        <Animated.Text  className="text-white ml-5"*/}
                {/*                        style={[ animatedStyleMh]}*/}
                {/*        >Mh</Animated.Text>*/}
                {/*    </View>*/}

                {/*</View>*/}
            </View>

            {/*    developer*/}
            <View>
                <Text className="text-2xl text-white decoration-1 underline  text-center mb-12">Developer: Romanchykov Serhii</Text>
            </View>

        </SafeAreaView>
    );
};



export default BottomSheetItem;
