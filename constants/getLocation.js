// getLocation.js
import * as Location from 'expo-location';

export const getCoordinates = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        return { latitude, longitude };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};
