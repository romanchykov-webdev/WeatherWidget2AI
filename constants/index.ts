import imagesBg from "./imagesBg";
import iconsWeather from "./iconsWeather";
import {WitherImagesBg, WitherImagesIcon} from "../types/index";

export {imagesBg, iconsWeather};


export const witherImagesBg = {
    // Clear (Ясно)
    "clear sky": imagesBg.clearSky,
    // Clouds (Облачно)
    "few clouds": imagesBg.clouds,
    "scattered clouds": imagesBg.clouds,
    "broken clouds": imagesBg.clouds,
    "overcast clouds": imagesBg.clouds,
    // Rain (Дождь)
    "light rain": imagesBg.rain,
    "moderate rain": imagesBg.rain3,
    "heavy intensity rain": imagesBg.rain,
    "very heavy rain": imagesBg.rain3,
    "extreme rain": imagesBg.rain,
    "freezing rain": imagesBg.rain3,
    "light intensity shower rain": imagesBg.rain3,
    "shower rain": imagesBg.rain,
    "heavy intensity shower rain": imagesBg.rain3,
    // Drizzle (Морось)
    "light intensity drizzle": imagesBg.drizzle,
    "drizzle": imagesBg.drizzle,
    "heavy intensity drizzle": imagesBg.drizzle,
    "light intensity drizzle rain": imagesBg.drizzle,
    "drizzle rain": imagesBg.drizzle,
    "heavy intensity drizzle rain": imagesBg.drizzle,
    "shower rain and drizzle": imagesBg.drizzle,
    "heavy shower rain and drizzle": imagesBg.drizzle,
    // Thunderstorm (Гроза)
    "thunderstorm with light rain": imagesBg.thunderstorm,
    "thunderstorm with rain": imagesBg.thunderstorm2,
    "thunderstorm with heavy rain": imagesBg.thunderstorm3,
    "light thunderstorm": imagesBg.thunderstorm,
    "thunderstorm": imagesBg.thunderstorm2,
    "heavy thunderstorm": imagesBg.thunderstorm3,
    "ragged thunderstorm": imagesBg.thunderstorm,
    // Snow (Снег)
    "light snow": imagesBg.snow,
    "Snow": imagesBg.snow2,
    "Heavy snow": imagesBg.snow3,
    "Sleet": imagesBg.snow4,
    "Light shower sleet": imagesBg.snow5,
    "Shower sleet": imagesBg.snow6,
    "Light rain and snow": imagesBg.snow,
    "Rain and snow": imagesBg.snow,
    "Light shower snow": imagesBg.snow2,
    "Shower snow": imagesBg.snow3,
    //Mist, Fog, Haze, Dust, Sand (Мгла, Туман, Пыль)
    "mist": imagesBg.mist,
    "smoke": imagesBg.mist,
    "haze": imagesBg.mist,
    "sand, dust whirls": imagesBg.mist,
    "fog": imagesBg.mist,
    "sand": imagesBg.mist,
    "dust": imagesBg.mist,
}

export const witherImagesIcon = {
    // Clear (Ясно)
    "clear sky": iconsWeather.sun,
    // Clouds (Облачно)
    "few clouds": iconsWeather.partlyCloudy,
    "scattered clouds": iconsWeather.partlyCloudy,
    "broken clouds": iconsWeather.cloud,
    "overcast clouds": iconsWeather.cloud,
    // Rain (Дождь)
    "light rain": iconsWeather.moderateRain,
    "moderate rain": iconsWeather.moderateRain,
    "heavy intensity rain": iconsWeather.heavyRain,
    "very heavy rain": iconsWeather.heavyRain,
    "extreme rain": iconsWeather.heavyRain,
    "freezing rain": iconsWeather.moderateRain,
    "light intensity shower rain": iconsWeather.moderateRain,
    "shower rain": iconsWeather.heavyRain,
    "heavy intensity shower rain": iconsWeather.heavyRain,
    // Drizzle (Морось)
    "light intensity drizzle": iconsWeather.moderateRain,
    "drizzle": iconsWeather.moderateRain,
    "heavy intensity drizzle": iconsWeather.moderateRain,
    "light intensity drizzle rain": iconsWeather.moderateRain,
    "drizzle rain": iconsWeather.moderateRain,
    "heavy intensity drizzle rain": iconsWeather.heavyRain,
    "shower rain and drizzle": iconsWeather.heavyRain,
    "heavy shower rain and drizzle": iconsWeather.heavyRain,
    // Thunderstorm (Гроза)
    "thunderstorm with light rain": iconsWeather.heavyRain,
    "thunderstorm with rain": iconsWeather.heavyRain,
    "thunderstorm with heavy rain": iconsWeather.heavyRain,
    "light thunderstorm": iconsWeather.heavyRain,
    "thunderstorm": iconsWeather.heavyRain,
    "heavy thunderstorm": iconsWeather.heavyRain,
    "ragged thunderstorm": iconsWeather.heavyRain,
    // Snow (Снег)
    "light snow": iconsWeather.snow,
    "Snow": iconsWeather.snow,
    "Heavy snow": iconsWeather.snow,
    "Sleet": iconsWeather.snow,
    "Light shower sleet": iconsWeather.snow,
    "Shower sleet": iconsWeather.snow,
    "Light rain and snow": iconsWeather.snow,
    "Rain and snow": iconsWeather.snow,
    "Light shower snow": iconsWeather.snow,
    "Shower snow": iconsWeather.snow,
    //Mist, Fog, Haze, Dust, Sand (Мгла, Туман, Пыль)
    "mist": iconsWeather.smoke,
    "smoke": iconsWeather.smoke,
    "haze": iconsWeather.smoke,
    "sand, dust whirls": iconsWeather.smoke,
    "fog": iconsWeather.smoke,
    "sand": iconsWeather.smoke,
    "dust": iconsWeather.smoke,
}