import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const CountDown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  //convert minutes to milliseconds
  const minsToMilli = (min) => min * 1000 * 60;

  //use state to store milliseconds, then separent into minute and seconds
  const [millis, setMillis] = useState(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  //format time for display so duoble digits are shown
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  //createc interval
  const interval = React.useRef(null);
  //use effect to start timer as soon as component mounts
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  //use effect to reset millies everytime the minutes get changed
  useEffect(() => {
    setMillis(minsToMilli(minutes));
  }, [minutes]);

  //countdown function called every second by use effect
  const countdown = () => {
    setMillis((time) => {
      if (time === 0) {
       clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(()=> {
     onProgress(millis / minsToMilli(minutes));
    if(millis === 0) {
      onEnd()
    }
  },[millis])

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'snow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
    padding: 20,
  },
  timer: {
    color: '#252250',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
