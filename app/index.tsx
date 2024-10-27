import { StatusBar } from 'expo-status-bar';
import {Text, ImageBackground, SafeAreaView, View,StyleSheet} from 'react-native';
import {witherImagesBg} from '@constants/index'
const typeWither='light snow'
export default function HomeScreen() {
  return (
      <SafeAreaView className="flex-1">
          <StatusBar style="light" />
      <ImageBackground
          source={witherImagesBg[typeWither]}
          resizeMode="cover"
          className="flex-1 items-center justify-center bg-blue-500"
      >
        {/*  overlay    */}
          <View style={{...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.5)'}}></View>
        {/*  body */}
        <Text className="text-red-600 text-xl">Hello, NativeWind!</Text>
        <Text className=""></Text>
      </ImageBackground>
      </SafeAreaView>
  );
}
