import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Entypo, Feather} from "@expo/vector-icons";
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated'


interface HeaderMenuComponentProps {
    isRefreshingDone: boolean;
    handlePresentModalPress: () => void;
}

const HeaderMenu = ({isRefreshingDone,handlePresentModalPress}: HeaderMenuComponentProps) => {
    // setIsImageLoaded
    // console.log('isImageLoaded',isImageLoaded)




    return (

        <View className="flex-row items-center justify-between mb-10
    {/*bg-red-500*/}
    ">

            {
                !isRefreshingDone && (<>
                    <Animated.View
                        entering={FadeInLeft.delay(200)}
                        className="flex-row gap-5 items-center">
                        <FontAwesome name="map-marker" size={24} color="white"/>
                        <Text className="text-2xl text-white font-bold">Torre di mosto</Text>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInRight.delay(200)}
                    >
                        <TouchableOpacity
                            onPress={handlePresentModalPress}
                            className="p-2
                {/*bg-red-500*/}
                "
                        >

                            {/*<Entypo name="menu" size={40} color="white"/>*/}
                            <Feather name="settings" size={40} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </>)
            }


        </View>
    );
};


export default HeaderMenu;
