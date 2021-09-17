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
        <Text style={styles.text}>What would you like to focus on?</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={tempItem}
          />
          <RoundedButton
            size={50}
            title="+"
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
    fontSize: 20,
    paddingBottom: 20,
  },
  title: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginRight: 20,
    borderRadius:5
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
