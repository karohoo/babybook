import { Card, Title, Paragraph } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('memory.db');

function Item({ date, subject, picture, id }) {
    const [memories, setMemories] = useState([]);
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from memory;', [], (_, { rows }) =>
                setMemories(rows._array)
            );
        });
    }
    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from memory where id = ?;`, [id]);
            }, null, updateList
        )
    }
    if (picture != "") {
        return (
            <Card style={styles.card}>
                <Card.Cover source={{ uri: picture }} />
                <Card.Content>
                    <Title>{date}</Title>
                    <Paragraph>{subject}</Paragraph>
                    <View style={styles.iconContainer}>
                        <Icon
                            iconStyle={styles.icon}
                            name="edit" />
                        <Icon
                            name="delete"
                            onPress={() => deleteItem(id)} />
                    </View>
                </Card.Content>
            </Card>
        );
    } else {
        return (
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{date}</Title>
                    <Paragraph>{subject}</Paragraph>
                    <Text style={{ fontSize: 18, color: '#0000ff' }} onPress={() => deleteItem(id)}> Done</Text>
                </Card.Content>
            </Card>
        )
    }
}

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
                <Card.Cover source={require("../../uploads/pic.jpg")} />
                <Card.Content>
                    <Title>2/2018</Title>
                    <Paragraph>On a holiday at summer cottage</Paragraph>
                </Card.Content>
            </Card>
            <FlatList
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <Item subject={item.subject} date={item.date} picture={item.picture} id={item.id} />
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
        borderWidth: 1,
        borderColor: '#d6d7da',
        marginTop: 10
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-end",
        marginTop: -28
    },
    icon: {
        marginRight: 10
    }
})
export default MemoryScreen;