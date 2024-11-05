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
// const typeWither = 'clear sky'


export default function HomeScreen() {

    const [loading, setLoading] = useState(false); // Состояние загрузки
    const [weather, setWeather] = useState<WeatherResponse | undefined>()
    const [location, setLocation] = useState<Coordinates>();
    const [forecast, setForecast] = useState<ForecastType>()

    const [myPosition, setMyPosition] = useState<Coordinates>()
    const [isPoint, setIsPoint] = useState<boolean>(false)

    // console.log('weather',weather.weather[0].description)
    // console.log('location',location)
    // console.log('myPosition',myPosition)





    const [isImageLoaded, setIsImageLoaded] = useState(true);

    useEffect(() => {
        if ( weather && forecast && !isImageLoaded ) {
            setLoading(false);
        }
    }, [ weather, forecast,isImageLoaded ]);

    const [tempType, setTempType] = useState(true) //fahrenheit ℉;

    // const changeTemp = () => {
    //     setTempType(!tempType)
    //     // console.log('tempType',tempType)
    // }


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
    const loadLocation = async () => {
        try {
            setLoading(true); // Устанавливаем лоадер в true
            const coords = await getCoordinates();
            setLocation(coords); // Устанавливаем координаты
            setMyPosition(coords)

        } catch (error) {
            console.error('Ошибка получения координат:', error);
        }finally {
            setLoading(false); // Устанавливаем лоадер в false после завершения
        }
    };
    useEffect(() => {


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
                setLoading(true);
                const forecastData = await fetchForecast(location.latitude, location.longitude);
                setForecast(forecastData);
                // console.log('forecastData data set in state:', forecastData);
            } catch (error) {
                console.error('Ошибка при загрузке данных о погоде:', error);
            }finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        if (location) {
            loadWeatherData();
            loadForecastData();

        }
    }, [location]);

    const description = weather?.weather?.[0]?.description || '';
    // get weather

    // console.log('location',location)

// Запуск только при изменении location или myPosition
    useEffect(() => {
        if (location && myPosition) {
            // Сравниваем координаты только при их изменении
            const isEqual =
                location.latitude === myPosition.latitude &&
                location.longitude === myPosition.longitude;

            if (isEqual) {
                // console.log('Координаты одинаковые: ок');
                setIsPoint(false);
            } else {
                // console.log('Координаты разные');
                setIsPoint(true);
            }
        }
    }, [location, myPosition]);



    return (
        <SafeAreaView className="flex-1"

        >
            <StatusBar style="dark" backgroundColor={'transparent'}/>
            <ImageBackground
                // source={witherImagesBg[typeWither]}
                // source={witherImagesBg[weather.weather[0].description]}
                source={witherImagesBg[description as keyof typeof witherImagesBg]}
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

                <ScrollView
                    keyboardDismissMode="on-drag"
                    className="mt-[50] w-full p-5
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
                        setLocation={setLocation}
                        loadLocation={loadLocation}
                        isPoint={isPoint}

                    />
                    {/*temp*/}
                    <TempComponent
                        tempType={tempType}
                        isRefreshingDone={isRefreshingDone}
                        // changeTemp={changeTemp}
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
