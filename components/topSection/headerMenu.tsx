import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Entypo, Feather} from "@expo/vector-icons";
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated'
import ChangeTemp from "@components/changeTemp";


interface HeaderMenuComponentProps {
    isRefreshingDone: boolean;
}

const HeaderMenu = ({isRefreshingDone}: HeaderMenuComponentProps) => {


    return (

        <View className="flex-row items-center justify-between mb-10
                        {/*bg-red-500*/}
                        ">

            {
                !isRefreshingDone && (
                    <>
                        <Animated.View
                            entering={FadeInLeft.delay(200)}
                            className="flex-row gap-5 items-center">
                            <FontAwesome name="map-marker" size={24} color="white"/>
                            <Text className="text-2xl text-white font-bold">Torre di mosto</Text>
                        </Animated.View>


                    </>


                )
            }


        </View>
    );
};


export default HeaderMenu;
