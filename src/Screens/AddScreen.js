
import React, { useState, useEffect } from 'react'
import { View, Text, Alert, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


function AddScreen() {
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [memory, setMemory] = useState('');
  const [picture, setPicture] = useState('');
  const [memories, setMemories] = useState([]);

  const db = SQLite.openDatabase('memory.db');

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })
      console.log(result);
      if (!result.cancelled) {
        let imgUrl = result.uri;
        setPicture(imgUrl);
      }
    }
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists memory (id integer primary key not null, date text, subject text, memory text, picture text);');
    }, null, updateList);
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into memory (date, subject, memory, picture) values (?, ?, ?, ?);',
        [date, subject, memory, picture]);
    }, null, updateList)
    Alert.alert(
      'Memory saved!'
    )
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
          label='Date'
          onChangeText={(date) =>
            setDate(date)}
          multiline={false}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <TextField
          style={styles.form}
          label='Subject'
          onChangeText={(subject) =>
            setSubject(subject)}
          multiline={false}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <TextField
          style={styles.form}
          label='Memory'
          onChangeText={(memory) =>
            setMemory( memory)}
          multiline={true}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <Icon
          name="add-a-photo"
          onPress={this._pickImage}
        />
        {picture &&  picture.length > 0 ?
          <Image source={{ uri: picture }} style={styles.image} /> : null}
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
    marginTop: 10
  },
  icon: {
    paddingBottom: 10
  },
  image: {
    width: 200, 
    height: 150,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: '#d6d7da',
  }
})

export default AddScreen;