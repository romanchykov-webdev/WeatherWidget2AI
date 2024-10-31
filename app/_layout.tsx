import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import "../global.css";
import Loader from "@components/loader/Loader";

// bottom sheet
import {GestureHandlerRootView} from 'react-native-gesture-handler';


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false)
    const [showLoader, setShowLoader] = useState(true);


    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            setAppReady(true);


            setTimeout(() => {
                setShowLoader(false);
            }, 2000);
        }
    }, [loaded]);

    // Отображаем Loader, пока шрифты не загружены или пока showLoader активен
    if (!appReady || showLoader) {
        return <Loader/>;
    }


    return <RootLayoutNav/>;
}


function RootLayoutNav() {


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
            </Stack>
        </GestureHandlerRootView>
    );
}
