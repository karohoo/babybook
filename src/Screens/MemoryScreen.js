import { Card, Title, Paragraph } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');

function MemoryScreen() {
    const [memories, setMemories] = useState([]);
    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('select * from memory;', [], (_, { rows }) =>
            setMemories(rows._array)
          );
        });
      })

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Card.Cover source={require("../../uploads/pic.jpg")} />
                    <Title>2/2018</Title>
                    <Paragraph>On a holiday at summer cottage</Paragraph>
                </Card.Content>
            </Card>
            <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) =>
            <Card style={styles.card}>
                <Card.Content>
                    <Card.Cover source={{ uri: item.picture }} />
                    <Title>{item.date}</Title>
                    <Paragraph>{item.subject}</Paragraph>
                </Card.Content>
            </Card>
            }
            data={memories}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    card: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#d6d7da',
        elevation: 2,
        marginTop: 10
    }
})
export default MemoryScreen;