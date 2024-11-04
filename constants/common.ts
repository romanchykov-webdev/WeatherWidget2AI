import {Dimensions, Platform} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

// Ширина устройства в процентах
export const wp = (percentage: number) => {
    // const width = deviceWidth;
    // return (percentage * width) / 100
    return (percentage * deviceWidth) / 100;
}

// Высота устройства в процентах
export const hp = (percentage: number) => {
    // const height = deviceHeight;
    // return (percentage * height) / 100
    return (percentage * deviceHeight) / 100;
}

export const paddingApp = () => {
    return wp(100) - 35
}


//platform
export const platform =Platform.OS === 'ios'

//box shadow
export const shadowStyle = {
    // padding: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)', // цвет тени
    shadowOffset: { width: 3, height: 3 }, // смещение тени
    shadowOpacity: 0.8, // только для iOS
    shadowRadius: 3, // радиус размытия тени
    elevation: 5, // для Android
};

export const formatTime = (unixTime: number, timezoneOffset: number) => {
    const date = new Date((unixTime + timezoneOffset) * 1000); // Конвертация в миллисекунды
    return date.toLocaleTimeString('ru-RU'); // Форматирование в понятное время
};

export const formattedDate = (dt: number) => {
    const date = new Date(dt * 1000);
    // return date.toLocaleString(); // Выводит дату и время в локальном формате
    return date.toLocaleDateString("ru-RU", {weekday: 'long', day: 'numeric'});

}

export const formattedDate2 = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString("ru-RU", options);
};

export const formattedDate3 = (dateString: string) => {
    const date = new Date(dateString);

    // Опции для получения названий месяца, дня недели и числа
    const optionsWeekday = { weekday: 'long' } as const; // Используем 'as const' для указания литералов
    const optionsMonth = { month: 'long' } as const;     // Используем 'as const' для указания литералов
    const optionsDay = { day: 'numeric' } as const;      // Используем 'as const' для указания литералов

    const weekday = date.toLocaleDateString("ru-RU", optionsWeekday);
    const month = date.toLocaleDateString("ru-RU", optionsMonth);
    const day = date.toLocaleDateString("ru-RU", optionsDay);

    return `${weekday}, ${month}, ${day}`;
};

export const formattedDate4 = (dateString: string) => {
    const date = new Date(dateString);

    // Получаем номер месяца и число месяца
    const month = date.getMonth() + 1; // getMonth() возвращает месяц от 0 до 11
    const day = date.getDate();         // getDate() возвращает день месяца

    return `${month}, ${day}`;
};

export const formattedDateDay = (dateString: string) => {
    const date = new Date(dateString);

    // Опции для получения полного названия дня недели
    const options = { weekday: 'long' } as const; // Используем 'as const'

    // Получаем день недели на английском
    const weekday = date.toLocaleDateString("en-US", options);

    return weekday;
};

// extractWeatherData ----------------------------------------
interface WeatherItem {
    dt: number;
    dt_txt: string;
    main: {
        temp_min: number;
        temp_max: number;
    };
    weather: { description: string }[];
}

interface City {
    sunrise: number;
    sunset: number;
    timezone: number;
}

interface WeatherData {
    list: WeatherItem[];
    city: City;
}

interface DailyWeather {
    dt_txt: string;
    main: {
        temp_min: number;
        temp_max: number;
    };
    sunrise: number;
    sunset: number;
    timezone: number;
    weather: { description: string }[];
}

export function extractWeatherData(weatherData: WeatherData): DailyWeather[] {
    // Группируем данные по дате
    const dailyWeather: { [key: string]: DailyWeather } = {};

    weatherData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // Получаем дату в формате YYYY-MM-DD

        if (!dailyWeather[date]) {
            dailyWeather[date] = {
                dt_txt: item.dt_txt,
                main: {
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                },
                sunrise: weatherData.city.sunrise,
                sunset: weatherData.city.sunset,
                timezone: weatherData.city.timezone,
                weather: [{
                    description: item.weather[0].description // Сохраняем только первое описание погоды
                }]
            };
        } else {
            // Обновляем минимальную и максимальную температуру
            dailyWeather[date].main.temp_min = Math.min(dailyWeather[date].main.temp_min, item.main.temp_min);
            dailyWeather[date].main.temp_max = Math.max(dailyWeather[date].main.temp_max, item.main.temp_max);
        }
    });

    // Преобразуем объект в массив
    const result = Object.keys(dailyWeather).map(date => ({
        dt_txt: dailyWeather[date].dt_txt,
        main: {
            temp_min: dailyWeather[date].main.temp_min,
            temp_max: dailyWeather[date].main.temp_max,
        },
        sunrise: dailyWeather[date].sunrise,
        sunset: dailyWeather[date].sunset,
        timezone: dailyWeather[date].timezone,
        weather: dailyWeather[date].weather // Оставляем только первое описание
    }));

    const removedObject = result.shift();

    return result;
}
