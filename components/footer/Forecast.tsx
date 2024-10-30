import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ForecastItem from "@components/footer/ForecastItem";
import Animated, {FadeInDown, FadeInRight, FadeInUp} from 'react-native-reanimated'

interface ForecastComponentProps {
    isRefreshingDone: boolean;
}

const Forecast = ({isRefreshingDone}: ForecastComponentProps) => {
    return (
        <>
            {
                !isRefreshingDone && (
                    <Animated.FlatList
                        entering={FadeInDown.delay(1200).springify()}
                        data={[1, 2, 3, 4, 5]}
                        contentContainerStyle={{gap: 15, marginBottom: 50}}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => <ForecastItem

                        />}
                    />
                )
            }
        </>


    );
};

const styles = StyleSheet.create({})

export default Forecast;
