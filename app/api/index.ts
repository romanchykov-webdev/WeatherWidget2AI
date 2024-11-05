import {WeatherType, ForecastType, WeatherResponse} from '../../types'; // Обновите путь в зависимости от расположения типов

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;



export const fetchWeather = async (latitude: number, longitude: number) => {
    try {
        const units = 'metric';
        const response = await fetch(
            `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
        );

        if (!response.ok) {
            throw new Error('Ошибка получения данных о погоде');
        }

        const data: WeatherType = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при запросе погоды:', error);
        throw error;
    }
};
// const result = await fetch(`${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=c480c725c0ac95eff8f6a2eb77fc2080&units=${units}`)
// https://api.openweathermap.org/data/2.5/onecall?lat=45.688714&lon=12.711327&exclude=hourly,minutely,current&appid=c480c725c0ac95eff8f6a2eb77fc2080&units=metric
//get forecast
export const fetchForecast = async (latitude: number, longitude: number) => {
    try {
        const units = 'metric';
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
            // `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,current&appid=${API_KEY}&units=${units}`
        );

        if (!response.ok) {
            throw new Error('Ошибка получения данных о погоде');
        }

        const data: ForecastType = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при запросе погоды:', error);
        throw error;
    }
};


export const fetchCities = async (query:any) => {
    const units = 'metric';
    if (query.length > 2) {
        const response = await fetch(
            `${BASE_URL}/find?q=${query}&type=like&appid=${API_KEY}&units=${units}`
        );
        const data = await response.json();
        // console.log('data', JSON.stringify(data));
        return data.list
    }
};