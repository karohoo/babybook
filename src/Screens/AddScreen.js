import React, { Component } from 'react'
import { View, Text, StyleSheet, Linking, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class AddScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      age: '',
      subject: '',
      memory: '',
      picture: ''
    };
  }
  render() {
    let { age } = this.state;
    let { subject } = this.state;
    let { memory } = this.state;
    let { picture } = this.state;

    return (
      <DismissKeyboard>
        <ScrollView style={styles.inputContainer}>
          <Text style={styles.text}>
          </Text>
          <TextField
            style={styles.form}
            label='Age'
            onChangeText={(age) =>
              this.setState({ age })}
            value={age}
            multiline={false}
            baseColor="#787878"
            itemColor="#ffc000"
          />
          <TextField
            style={styles.form}
            label='Subject'
            onChangeText={(subject) =>
              this.setState({ subject })}
            value={subject}
            multiline={false}
            baseColor="#787878"
            tintColor="#ffc000"
          />
          <TextField
            style={styles.form}
            label='Memory'
            onChangeText={(memory) =>
              this.setState({ memory })}
            value={memory}
            multiline={true}
            baseColor="#787878"
            tintColor="#ffc000"
          />
          <View style={styles.form}>
            <Button style={styles.button} icon="checkbox-marked-circle-outline" color="#333333" mode="outlined" onPress={() => console.log('Pressed')}>
              Save
            </Button>
          </View>
        </ScrollView>
      </DismissKeyboard>
    );
  }
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