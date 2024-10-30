import React, {useCallback, useState} from 'react';
import {View, TextInput, TouchableOpacity, Platform} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
// for animated
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing, FadeOut, FadeIn, FadeInRight,
} from 'react-native-reanimated';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {paddingApp} from "@constants/common";

// debounce
import {debounce} from 'lodash';

interface HeaderSearchComponentProps {
    isRefreshingDone: boolean;
}


const HeaderSearch = ({isRefreshingDone}:HeaderSearchComponentProps) => {

    const [searchActive, setSearchActive] = useState(false)
    const [input, setInput] = useState('')
    // for animated width
    const width = useSharedValue(0);
    const opacity = useSharedValue(0);


    const handleSearch = () => {
        setSearchActive(!searchActive);
        if(!searchActive)setInput('')

        // Управляем анимацией ширины и прозрачности
        if (searchActive) {
            width.value = withTiming(0, { duration: 500, easing: Easing.ease });
            opacity.value = withTiming(0, { duration: 500, easing: Easing.ease });
        } else {
            width.value = withTiming(paddingApp(), { duration: 500, easing: Easing.ease });
            opacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        width: width.value,
        opacity: opacity.value,
    }));

    const handleTextChange = (value: string) => {
        setInput(value);
        if(value.length>2){

        }

    };
    // console.log('input',input)

    return (
        <View className=" w-full
    {/*bg-red-500*/}
    ">
            {
                !isRefreshingDone &&
                (
                    <Animated.View
                        entering={FadeInRight.delay(400)}
                        className=" flex-1 flex-row items-center justify-end
        {/*bg-white*/}
        ">
                        {/* input   */}

                        <Animated.View
                            style={[animatedStyle, { height: '100%'}]}
                            className="w-full

                    {/*rounded-3xl*/}
                    {/*           bg-red-500*/}
                               "
                        >

                            <TextInput className=" w-full h-[60] text-lg text-white border-2 border-neutral-500 p-5 rounded-full "
                                       style={{backgroundColor:'rgba(0,0,0,0.5)'}}

                                       placeholder="Поиск места"
                                       placeholderTextColor='grey'

                                       value={input}
                                       onChangeText={handleTextChange}

                            />
                        </Animated.View>

                        {/*icon*/}
                        <TouchableOpacity
                            onPress={handleSearch}
                            className="absolute right-0 p-5  bg-neutral-500 rounded-full border-2 border-neutral-600"
                        >

                            {
                                searchActive
                                    ? (<FontAwesome name="search-minus" size={24} color="black"/>)
                                    : (<AntDesign name="search1" size={24} color="black"/>)
                            }


                        </TouchableOpacity>
                    </Animated.View>
                )
            }

        </View>
    );
};



export default HeaderSearch;
