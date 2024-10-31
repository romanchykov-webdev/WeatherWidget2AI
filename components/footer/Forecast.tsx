import React from 'react';
import {StyleSheet} from 'react-native';
import ForecastItem from "@components/footer/ForecastItem";
import Animated, {FadeInDown} from 'react-native-reanimated'
import {ForecastType} from "../../types";
import {extractWeatherData} from "@constants/common";

interface ForecastComponentProps {
    isRefreshingDone: boolean;
    forecast?:ForecastType
}

const Forecast = ({isRefreshingDone,forecast}: ForecastComponentProps) => {

    // console.log(forecast)
    if (!forecast || !forecast.city) {
        return null; // или можно отобразить пустой компонент, если данных нет
    }




// Пример использования
    const extractedData = extractWeatherData(forecast);
    // const removedObject = extractedData.shift();
    // console.log(JSON.stringify(extractedData,null,2));



    return (
        <>
            {
                !isRefreshingDone && (
                    <Animated.FlatList
                        entering={FadeInDown.delay(1200).springify()}
                        // data={forecast.list}
                        data={extractedData}
                        contentContainerStyle={{gap: 15, marginBottom: 50}}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => <ForecastItem
                            forecastData={item}
                        />}
                    />
                )
            }
        </>


    );
};

const styles = StyleSheet.create({})

export default Forecast;
