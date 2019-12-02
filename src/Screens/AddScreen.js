import React, { useState, useEffect } from 'react'
import { View, Alert, Text, StyleSheet, Linking, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function AddScreen() {
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [memory, setMemory] = useState('');
  const [picture, setPicture] = useState('');
  const [memories, setMemories] = useState('');

  const db = SQLite.openDatabase('memorydb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists memory(id integer primary key not null, age text, date text, subject text, memory text, picture text);');
    }, null, updateList);
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into memory (age, date, subject, memory, picture) values (?, ?, ?, ?, ?);',
        [age, date, subject, memory, picture]);
    }, null, updateList)
  }
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from memory;', [], (_, { rows }) =>
        setMemories(rows._array)
      );
    });
  }
  return (
    <DismissKeyboard>
      <ScrollView style={styles.inputContainer}>
        <Text style={styles.text}>
        </Text>
        <TextField
          style={styles.form}
          label='Age'
          onChangeText={(age) => -
            setAge({ age })}
          multiline={false}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <TextField
          style={styles.form}
          label='Subject'
          onChangeText={(subject) =>
            setSubject({ subject })}
          multiline={false}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <TextField
          style={styles.form}
          label='Memory'
          onChangeText={(memory) =>
            setMemory({ memory })}
          multiline={true}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <View style={styles.form}>
          <Button style={styles.button} icon="checkbox-marked-circle-outline" color="#333333" mode="outlined" onPress={saveItem}>
            Save
          </Button>
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    flex: 0.5,
    textAlign: "center"
  },
  form: {
    flex: 1
  },
  inputContainer: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    width: 100,
    alignSelf: "center",
    marginTop: 25
  }
})

export default AddScreen;