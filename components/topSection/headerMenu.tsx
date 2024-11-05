import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Entypo, Feather, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated'
import ChangeTemp from "@components/changeTemp";


interface HeaderMenuComponentProps {
    isRefreshingDone: boolean;
    nameLocation:string
    loadLocation: () => void;
    isPoint:boolean;
}

const HeaderMenu = ({isRefreshingDone,nameLocation,loadLocation,isPoint}: HeaderMenuComponentProps) => {

const getLocation=()=>{
    loadLocation()
}
    // console.log('isPoint',isPoint)

    return (

        <View className="flex-row items-center justify-between mb-11
                        {/*bg-red-500*/}
                        ">

            {
                !isRefreshingDone && (
                    <>
                        <Animated.View
                            entering={FadeInLeft.delay(200)}
                            className="flex-row gap-5 items-center">
                            <FontAwesome name="map-marker" size={24} color="white"/>
                            <Text className="text-2xl text-white font-bold">{nameLocation}</Text>
                        </Animated.View>


                        {
                            isPoint &&<Animated.View
                                entering={FadeInRight.delay(200)}
                                className="flex-row gap-5 items-center"

                            >
                                <TouchableOpacity onPress={getLocation}>

                                    <MaterialIcons name="person-pin-circle" size={34} color="white" />
                                </TouchableOpacity>
                            </Animated.View>
                        }

                    </>


                )
            }


        </View>
    );
};


export default HeaderMenu;
