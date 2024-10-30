import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderMenu from "@components/topSection/headerMenu";
import HeaderSearch from "@components/topSection/headerSearch";


interface HeaderComponentProps {
    isRefreshingDone: boolean;
}

const HeaderComponent =({isRefreshingDone}:HeaderComponentProps) => {
    return (
        <View className="flex-col">
            <HeaderMenu isRefreshingDone={isRefreshingDone}/>
            <HeaderSearch isRefreshingDone={isRefreshingDone}/>
        </View>
    );
};

const styles = StyleSheet.create({})

export default HeaderComponent;
