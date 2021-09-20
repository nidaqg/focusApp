import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject, subjectList }) => {
  const [tempItem, setTempItem] = useState(null);

//function for when you type into text input field
  const handleChange = (tempItem) => {
    setTempItem(tempItem)
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Let's get started! What would you like to focus on today?</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={tempItem}
          />
        </View>
        <View style={styles.btn}>
        <RoundedButton
            title="Start"
            onPress={() => {
              addSubject(tempItem);
            }}
          />
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    paddingBottom: 20,
    textAlign: 'center'
  },
  title: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    margin: 20,
    borderRadius:5
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  }
});
