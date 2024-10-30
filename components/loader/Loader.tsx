import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import {hp, wp} from "@constants/common";
import {StatusBar} from "expo-status-bar";

import Animated, {FadeIn, ZoomIn, ZoomOut} from 'react-native-reanimated'
const AnimationLottieView = Animated.createAnimatedComponent(LottieView);


const Loader = () => {
    const animation = useRef<LottieView>(null);

    useEffect(() => {
        // Запуск анимации с 30-го кадра до конца
        animation.current?.play(1, 230); // 120 - конечный кадр или укажите -1 для проигрывания до конца
    }, []);

  return (
      <View style={[StyleSheet.absoluteFill, {width:wp(100),height:hp(110), justifyContent: "center", alignItems: 'center',backgroundColor:"rgba(0,0,0,0.98)" }]}>

          <StatusBar style="light"/>

        <AnimationLottieView
            exiting={ZoomOut.delay(100)}
            entering={ZoomIn.delay(100).springify()}
            autoPlay
            loop
            ref={animation}
            style={{
                width: wp(100),
                height: 400,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../assets/lotiie/loader.json')}
        />

    </View>
  );
};

const styles = StyleSheet.create({})

export default Loader;
