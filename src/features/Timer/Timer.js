import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform, SafeAreaView } from 'react-native';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSub, onTimerEnd, clearSubject }) => {
  //this will keep phone 'awake' while counter is running
  useKeepAwake();

  const [minutes, setMinutes] = useState(0.5);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  //functiuon to change time when btns clicked
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };


//function to cause phone to vibrate
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => {
        clearInterval(interval), 5000;
      });
    } else {
      Vibration.vibrate(5000);
    }
  };

  //set progress bar
  const progressSetter = (progress) => {
    setProgress(progress);
  };

  //function gets called when countdown ends
  const onEnd = () => {
    setMinutes(20);
    setProgress(1);
    setIsStarted(false);
    vibrate();
    onTimerEnd();
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.task}>Focusing on:</Text>
        <Text style={styles.title}>{focusSub}</Text>

        <ProgressBar
          color="#5E84E2"
          style={{ height: 10 }}
          progress={progress}
        />
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={progressSetter}
          onEnd={onEnd}
        />
      </View>

      <Timing onChangeTime={changeTime} />
      <View style={styles.buttons}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>

      <View style={styles.btn}>
        <RoundedButton title="Clear" size={75} onPress={() => clearSubject()} />
      </View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 40,
  },
  task: {
    color: 'white',
    textAlign: 'center',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingRight: 20,
    paddingBottom: 20,
  },
});
