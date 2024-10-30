import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderMenu from "@components/topSection/headerMenu";
import HeaderSearch from "@components/topSection/headerSearch";


interface HeaderComponentProps {
    isRefreshingDone: boolean;
    handlePresentModalPress: () => void;
}

const HeaderComponent =({isRefreshingDone,handlePresentModalPress}:HeaderComponentProps) => {
    return (
        <View className="flex-col">
            <HeaderMenu isRefreshingDone={isRefreshingDone} handlePresentModalPress={handlePresentModalPress}/>
            <HeaderSearch isRefreshingDone={isRefreshingDone}/>
        </View>
    );
};

const styles = StyleSheet.create({})

export default HeaderComponent;
