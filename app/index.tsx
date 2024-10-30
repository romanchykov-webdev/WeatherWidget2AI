import {StatusBar} from 'expo-status-bar';
import {

    ImageBackground,
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {witherImagesBg} from '@constants/index'
import HeaderComponent from "@components/topSection/header";
import {hp, platform} from "@constants/common";
import TempComponent from "@components/body/Temp";
import React, {useCallback, useEffect,  useState} from "react";
import OtherInfo from "@components/body/OtherInfo";
import Forecast from "@components/footer/Forecast";
import Loader from "@components/loader/Loader";

// type for api
import {WeatherType,ForecastType} from '../types/index'

// const typeWither = 'light snow'
// const typeWither = 'light rain'
// const typeWither = 'moderate rain'
const typeWither = 'clear sky'


export default function HomeScreen() {


    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // change Temperature
    // const [tempType, setTempType] = useState('°C') //fahrenheit ℉;
    const [tempType, setTempType] = useState(true) //fahrenheit ℉;

    const changeTemp=()=>{
        setTempType(!tempType)
        // console.log('tempType',tempType)
    }



    // Проверяем, что все компоненты готовы, включая изображение
    const [isRefreshingDone, setIsRefreshingDone] = useState(false);

    useEffect(() => {
        if (isImageLoaded) {
            setIsImageLoaded(true)
        }
    }, [isImageLoaded]);

    // console.log('isImageLoaded index',isImageLoaded)

    // Функция для обновления данных
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsImageLoaded(true);
        // Имитация загрузки данных
        setTimeout(() => {
            // Здесь можно обновить данные, например, запросом на сервер
            setRefreshing(false);
            setIsImageLoaded(false);
            setIsRefreshingDone(true); // Установите true, чтобы запустить анимацию
        }, 2000);
    }, []);
    // Сброс состояния `isRefreshingDone`, когда анимация начинается
    useEffect(() => {
        if (isRefreshingDone) {
            setIsRefreshingDone(false);
        }
    }, [isRefreshingDone]);

    // api get weather
    const BASE_URL = `https://api.openweathermap.org/data/2.5`
    const api_key = process.env.EXPO_PUBLIC_API_KEY;
    const [weather, setWeather] = useState<WeatherType>()
    const [forecast, setForecast] = useState<ForecastType>()

    useEffect(() => {
        fetchWeather()
    }, []);
    // get weather
    const latitude='45.688714';
    const longitude='12.711327'
    const fetchWeather = async () => {
        // if (!location) {
        //     return null
        // }

        //fetch data
        // const latitude='45.688714'
        // const latitude = location?.coords?.latitude
        // const longitude='12.711327'
        // const longitude = location?.coords?.longitude
        const units = 'metric'
        console.log(`${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=${units}`)

        const result = await fetch(`${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=${units}`)
        const data = await result.json()
        console.log(JSON.stringify(data,null,2))
            setWeather(data)
    }



    return (
        <SafeAreaView className="flex-1"

        >
            <StatusBar style="dark" backgroundColor={'transparent'}/>
            <ImageBackground
                source={witherImagesBg[typeWither]}
                resizeMode="cover"
                className="flex-1 items-center justify-center
                {/*bg-red-500*/}
                "
                style={{minHeight: hp(100) + 30}}
                onLoadEnd={() => setIsImageLoaded(false)}
            >

                {/*  overlay    */}
                <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)'}}></View>

                {/*  body */}

                <ScrollView className="mt-[50] w-full p-5
                {/*bg-red-500*/}
                "
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom: platform ? 100 : 20}}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {/*header*/}
                    <HeaderComponent
                        isRefreshingDone={isRefreshingDone}
                    />

                    {/*temp*/}
                    <TempComponent
                        tempType={tempType}
                        isRefreshingDone={isRefreshingDone}
                        changeTemp={changeTemp}
                    />





                    {/*other*/}
                    <OtherInfo
                        isRefreshingDone={isRefreshingDone}
                    />

                    {/*Forecast*/}
                    <Forecast
                        isRefreshingDone={isRefreshingDone}
                    />


                </ScrollView>
            </ImageBackground>




            {/* Показываем Loader, пока изображение не загрузится */}
            {
                isImageLoaded && <Loader/>
            }

        </SafeAreaView>
    );
}
