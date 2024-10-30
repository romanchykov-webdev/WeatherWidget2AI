import {StatusBar} from 'expo-status-bar';
import {

    ImageBackground,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Button,
} from 'react-native';
import {witherImagesBg} from '@constants/index'
import HeaderComponent from "@components/topSection/header";
import {hp, platform} from "@constants/common";
import TempComponent from "@components/body/Temp";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import OtherInfo from "@components/body/OtherInfo";
import Forecast from "@components/footer/Forecast";
import Loader from "@components/loader/Loader";

// bottom sheet
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import BottomSheetItem from "@components/botomSheet/bottomSheetItem";


// const typeWither = 'light snow'
// const typeWither = 'light rain'
// const typeWither = 'moderate rain'
const typeWither = 'clear sky'


export default function HomeScreen() {


    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // change Temperature
    // const [tempType, setTempType] = useState('°C') //fahrenheit ℉;
    const [tempType, setTempType] = useState(true) //fahrenheit ℉;

    const changeTemp=()=>{
        setTempType(!tempType)
        console.log('tempType',tempType)
    }
    // console.log('tempType',tempType)
    // useEffect(() => {
    //     setTempType(tempType);
    // }, [tempType]);


    // Проверяем, что все компоненты готовы, включая изображение
    const [isRefreshingDone, setIsRefreshingDone] = useState(false);

    useEffect(() => {
        if (isImageLoaded) {
            setIsImageLoaded(true)
        }
    }, [isImageLoaded]);

    // console.log('isImageLoaded index',isImageLoaded)

    // Функция для обновления данных
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsImageLoaded(true);
        // Имитация загрузки данных
        setTimeout(() => {
            // Здесь можно обновить данные, например, запросом на сервер
            setRefreshing(false);
            setIsImageLoaded(false);
            setIsRefreshingDone(true); // Установите true, чтобы запустить анимацию
        }, 2000);
    }, []);
    // Сброс состояния `isRefreshingDone`, когда анимация начинается
    useEffect(() => {
        if (isRefreshingDone) {
            setIsRefreshingDone(false);
        }
    }, [isRefreshingDone]);


    // bottom sheet
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        // console.log('handlePresentModalPress',bottomSheetModalRef)
        bottomSheetModalRef.current?.present();
    }, []);
    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss(); // Закрытие Bottom Sheet
    }, []);

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
                {/*<BlurView intensity={5} className="flex-1  absolute w-full h-full top-0 left-0">*/}
                <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)'}}></View>
                {/*</BlurView>*/}

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
                        handlePresentModalPress={handlePresentModalPress}
                    />

                    {/*temp*/}
                    <TempComponent
                        tempType={tempType}
                        isRefreshingDone={isRefreshingDone}
                    />

                    {/*other*/}
                    <OtherInfo
                        isRefreshingDone={isRefreshingDone}
                    />

                    {/*Forecast*/}
                    <Forecast
                        isRefreshingDone={isRefreshingDone}
                    />


                </ScrollView>
            </ImageBackground>

            {/*bottom sheet*/}
            <BottomSheetModalProvider>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    // onChange={handleSheetChanges}
                >
                    <BottomSheetView  style={{flex:1}}>
                        <BottomSheetItem
                            tempType={tempType}
                            handleCloseModalPress={handleCloseModalPress}
                            changeTemp={changeTemp}
                        />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* Показываем Loader, пока изображение не загрузится */}
            {
                isImageLoaded && <Loader/>
            }

        </SafeAreaView>
    );
}
