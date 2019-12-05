
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard, } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'

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
      tx.executeSql('create table if not exists memory (id integer primary key not null, age text, date text, subject text, memory text, picture text);');
    }, null, updateList);
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into memory (age, date, subject, memory, picture) values (?, ?, ?, ?, ?);',
        [age, date, subject, memory, picture]);
    }, null, updateList)
    console.log(memories);
  }
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from memory;', [], (_, { rows }) =>
        setMemories(rows._array)
      );
    });
  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };
  return (
    <DismissKeyboard>
      <ScrollView style={styles.inputContainer}>
        <Text style={styles.text}>
        </Text>
        <TextField
          style={styles.form}
          label='Age'
          onChangeText={(age) =>
            setAge(age)}
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
            setMemory(memory)}
          multiline={true}
          baseColor="#787878"
          tintColor="#ffc000"
        />
        <Icon
          name="image"
          onPress={this._pickImage}
        />
        {/* {picture &&
          <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />} */}
        <View style={styles.form}>
          <Button style={styles.button} icon="checkbox-marked-circle-outline" color="#333333" mode="outlined" onPress={saveItem}>
            Save
          </Button>
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Card >
            <Card.Content>
              {/* <Card.Cover source={{ uri: item.picture }} /> */}
              <Title>{item.date}</Title>
              <Paragraph>{item.subject}</Paragraph>
            </Card.Content>
          </Card>}
          data={memories}
          ItemSeparatorComponent={listSeparator}
        />
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