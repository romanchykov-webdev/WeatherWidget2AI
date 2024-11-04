// src/types/weather.d.ts
export interface WeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain?: {
        '1h': number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // если не всегда присутствует
    grnd_level?: number; // если не всегда присутствует
}
export interface  Timezone{
    timezone: number ;
}
export interface  SunriseSunset{
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
//weather
export type WeatherType = {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    },
}

export type ForecastType = {
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        visibility: number;
        pop: number;
        rain?: {
            "3h": number;
        };
        sys: {
            pod: string;
        };
        dt_txt: string;
    }>;
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};

//location
// Создаём тип для координат
export type Coordinates = {
    latitude: number;
    longitude: number;
};

//imaGR TYPE
// src/types/weatherImages.d.ts
export type WeatherDescription =
    | 'clear sky'
    | 'few clouds'
    | 'scattered clouds'
    | 'broken clouds'
    | 'overcast clouds'
    | 'light rain'
    | 'moderate rain'
    | 'heavy intensity rain'
    | 'very heavy rain'
    | 'extreme rain'
    | 'freezing rain'
    | 'light intensity shower rain'
    | 'shower rain'
    | 'heavy intensity shower rain'
    | 'light intensity drizzle'
    | 'drizzle'
    | 'heavy intensity drizzle'
    | 'light intensity drizzle rain'
    | 'drizzle rain'
    | 'heavy intensity drizzle rain'
    | 'shower rain and drizzle'
    | 'heavy shower rain and drizzle'
    | 'thunderstorm with light rain'
    | 'thunderstorm with rain'
    | 'thunderstorm with heavy rain'
    | 'light thunderstorm'
    | 'thunderstorm'
    | 'heavy thunderstorm'
    | 'ragged thunderstorm'
    | 'light snow'
    | 'snow'
    | 'Snow'
    | 'Heavy snow'
    | 'heavy snow'
    | 'sleet'
    | 'Sleet'
    | 'light shower sleet'
    | 'Light shower sleet'
    | 'shower sleet'
    | 'Shower sleet'
    | 'Light rain and snow'
    | 'light rain and snow'
    | 'rain and snow'
    | 'Rain and snow'
    | 'light shower snow'
    | 'Light shower snow'
    | 'shower snow'
    | 'Shower snow'
    | 'mist'
    | 'smoke'
    | 'haze'
    | 'sand, dust whirls'
    | 'fog'
    | 'sand'
    | 'dust';

// Определение типов для изображений
export type WitherImagesBg = {
    [key in WeatherDescription]: any; // Замените `any` на правильный тип, если нужно
};

export type WitherImagesIcon = {
    [key in WeatherDescription]: any; // Замените `any` на правильный тип, если нужно
};
