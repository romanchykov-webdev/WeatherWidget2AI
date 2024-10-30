import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";


interface ChangeTempProps {
    tempType: boolean;
    changeTemp:() => void;
}
const ChangeTemp = ({tempType,changeTemp}:ChangeTempProps) => {

    const [isEnabled, setIsEnabled] = useState(tempType);

    const toggleSwitchTemp = () => {
        setIsEnabled(previousState => !previousState)
        changeTemp()

    };

    const animatedStyleCelsius = useAnimatedStyle(() => ({
        fontSize: withTiming(!isEnabled ? 24 : 32, { duration: 300 }),
        // color: isEnabled ? 'white' : '#FFD700',
        color: isEnabled ? '#FFD700' : 'white',
    }));

    const animatedStyleFahrenheit = useAnimatedStyle(() => ({
        fontSize: withTiming(!isEnabled ? 32 : 24, { duration: 300 }),
        // color: isEnabled ? '#FFD700' : 'white',
        color: isEnabled ? 'white' : '#FFD700',
    }));

  return (
      <View className="flex-row items-center
      {/*bg-red-200*/}
      ">
          <Animated.Text className="text-white mr-5"
                         style={[ animatedStyleCelsius]}
          >°C</Animated.Text>
          <Switch
              className=""
              trackColor={{false: '#767577', true: '#767577'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f5dd4b'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchTemp}
              value={!isEnabled}
          />
          <Animated.Text  className="text-white ml-5"
                          style={[ animatedStyleFahrenheit]}
          >°F</Animated.Text>
      </View>
  );
};

const styles = StyleSheet.create({})

export default ChangeTemp;
