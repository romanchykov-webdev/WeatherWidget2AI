import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderMenu from "@components/topSection/headerMenu";
import HeaderSearch from "@components/topSection/headerSearch";


interface HeaderComponentProps {
    isRefreshingDone: boolean;
    nameLocation:string;
    setLocation: (coords: { latitude: number; longitude: number }) => void;
    loadLocation: () => void;
    isPoint:boolean;
}

const HeaderComponent =({isRefreshingDone,nameLocation,setLocation,loadLocation,isPoint}:HeaderComponentProps) => {
    return (
        <View className="flex-col mb-5 z-50">
            <HeaderMenu isRefreshingDone={isRefreshingDone} nameLocation={nameLocation} loadLocation={loadLocation} isPoint={isPoint} />
            <HeaderSearch isRefreshingDone={isRefreshingDone} setLocation={setLocation}/>
        </View>
    );
};

const styles = StyleSheet.create({})

export default HeaderComponent;
