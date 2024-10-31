import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderMenu from "@components/topSection/headerMenu";
import HeaderSearch from "@components/topSection/headerSearch";


interface HeaderComponentProps {
    isRefreshingDone: boolean;
    nameLocation:string
}

const HeaderComponent =({isRefreshingDone,nameLocation}:HeaderComponentProps) => {
    return (
        <View className="flex-col mb-5">
            <HeaderMenu isRefreshingDone={isRefreshingDone} nameLocation={nameLocation} />
            <HeaderSearch isRefreshingDone={isRefreshingDone}/>
        </View>
    );
};

const styles = StyleSheet.create({})

export default HeaderComponent;
