import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={{ color: item.status === 'cancelled' ? 'red' : 'green' }}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {

  return (
    <>
      <SafeAreaView style={{flex:1,alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={{ color: 'white', fontSize: 18, paddingBottom: 10 }}>
              Things we have focused on:
            </Text>

            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <RoundedButton
            title='clear' size={75} onPress={() => onClear()}/>

          </>
        )}
      </SafeAreaView>
    </>
  );
};
