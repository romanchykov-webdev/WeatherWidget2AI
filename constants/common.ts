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

export const formatTime = (unixTime: number, timezoneOffset: number) => {
    const date = new Date((unixTime + timezoneOffset) * 1000); // Конвертация в миллисекунды
    return date.toLocaleTimeString('ru-RU'); // Форматирование в понятное время
};

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