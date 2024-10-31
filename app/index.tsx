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
import React, {useCallback, useEffect, useState} from "react";
import OtherInfo from "@components/body/OtherInfo";
import Forecast from "@components/footer/Forecast";
import Loader from "@components/loader/Loader";

// type for api
import { ForecastType, Coordinates, WeatherResponse} from '../types/'

// get location


import {getCoordinates} from "@constants/getLocation";
import {fetchForecast, fetchWeather} from "@/api";
// get location

// const typeWither = 'light snow'
// const typeWither = 'light rain'
// const typeWither = 'moderate rain'
const typeWither = 'clear sky'


export default function HomeScreen() {

    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [weather, setWeather] = useState<WeatherResponse | undefined>()
    const [location, setLocation] = useState<Coordinates>();
    const [forecast, setForecast] = useState<ForecastType>()





    const [isImageLoaded, setIsImageLoaded] = useState(true);

    useEffect(() => {
        if ( weather && forecast && !isImageLoaded ) {
            setLoading(false);
        }
    }, [ weather, forecast,isImageLoaded ]);

    const [tempType, setTempType] = useState(true) //fahrenheit ℉;

    const changeTemp = () => {
        setTempType(!tempType)
        // console.log('tempType',tempType)
    }


    // Проверяем, что все компоненты готовы, включая изображение
    const [isRefreshingDone, setIsRefreshingDone] = useState(false);


    // Функция для обновления данных
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setIsImageLoaded(true);
        // Имитация загрузки данных

        // Здесь можно обновить данные, например, запросом на сервер
        await loadWeatherData(); // Запрос погоды при обновлении
        await loadForecastData(); // Запрос погоды при обновлении
        setRefreshing(false);
        setIsImageLoaded(false);
        setIsRefreshingDone(true); // Установите true, чтобы запустить анимацию

    }, []);
    // Сброс состояния `isRefreshingDone`, когда анимация начинается
    useEffect(() => {
        if (isRefreshingDone) {
            setIsRefreshingDone(false);
        }
    }, [isRefreshingDone]);


    // get location xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    // Получаем координаты при первой загрузке
    useEffect(() => {

        const loadLocation = async () => {
            try {
                const coords = await getCoordinates();
                setLocation(coords); // Устанавливаем координаты
            } catch (error) {
                console.error('Ошибка получения координат:', error);
            }
        };
        loadLocation();

    }, []);



    const loadWeatherData = async () => {
        if (location) {
            try {
                const weatherData = await fetchWeather(location.latitude, location.longitude);
                setWeather(weatherData as any);
                // console.log('Weather data set in state:', weatherData?.name);
            } catch (error) {
                console.error('Ошибка при загрузке данных о погоде:', error);
            }
        }
    };


    // get location xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    // api get weather xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const loadForecastData = async () => {
        if (location) {
            try {
                const forecastData = await fetchForecast(location.latitude, location.longitude);
                setForecast(forecastData);
                // console.log('forecastData data set in state:', forecastData);
            } catch (error) {
                console.error('Ошибка при загрузке данных о погоде:', error);
            }
        }
    };
    useEffect(() => {
        if (location) {
            loadWeatherData();
            loadForecastData();

        }
    }, [location]);


    // get weather
    // console.log('weather',JSON.stringify(weather,null,2));

    // if (loading || !weather || !forecast) {
    //     return <Loader />; // Показываем Loader, пока не загрузится изображение и все данные
    // }


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
                        nameLocation={weather ? weather.name : ''}
                    />
                    {/*temp*/}
                    <TempComponent
                        tempType={tempType}
                        isRefreshingDone={isRefreshingDone}
                        changeTemp={changeTemp}
                        weatherMain={weather ? weather.main : null} // Передаем null вместо строки
                    />


                    {/*other*/}
                    <OtherInfo
                        isRefreshingDone={isRefreshingDone}
                        // weatherMainHumidity={weather ? weather.main : null}
                        weatherOther={weather ?? undefined}
                    />

                    {/*Forecast*/}
                    <Forecast
                        isRefreshingDone={isRefreshingDone}
                        forecast={forecast ?? {} as ForecastType }
                    />


                </ScrollView>
            </ImageBackground>


            {/* Показываем Loader, пока изображение не загрузится */}
            {( loading || !weather || !forecast) && <Loader />}

        </SafeAreaView>
    );
}
