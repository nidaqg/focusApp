import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/Timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSub, setFocusSub] = useState('coding');
  const [focusHistory, setFocusHistory] = useState([]);

  //setfocushistory with state
  const addHistoryState = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length +1),subject, status }]);
  };

  //functiion to save hostory even if app is closed
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  //save focus history to async storage everytime focus history changes
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  //function to load focus history from thr async storage
  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

//use effect to load storaed history when component mounts
  useEffect(()=> {
    loadHistory()
  }, []);

  //run functuon when clear btn is pressed
  const clearSubject = () => {
    addHistoryState(focusSub, 'cancelled');
    setFocusSub(null);
  };

  //run function when clear btn on focus page is pressed to cleaer list
  const onClear = () => {
    setFocusHistory([]);
  };

  return (
    <View style={styles.container}>
      {focusSub ? (
        <Timer
          focusSub={focusSub}
          onTimerEnd={() => {
            addHistoryState(focusSub, 'complete');
            setFocusSub(null);
          }}
          clearSubject={clearSubject}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSub} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    paddingTop: 50,
  },
});
