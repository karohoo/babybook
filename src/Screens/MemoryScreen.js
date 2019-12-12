import { Card, Title, Paragraph } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('memory.db');

function Item({ date, subject, memory, picture, id }) {
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
                <View style={styles.memoryTextContainer}>
                    <Text style={styles.memoryText}>&#8221; {memory} &#8221; </Text>
                </View>
                <Card.Content style={styles.content}>
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
            <FlatList
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <Item subject={item.subject} date={item.date} memory={item.memory} picture={item.picture} id={item.id} />
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
    },
    content: {
        borderTopWidth: 1,
        borderTopColor: '#d6d7da',
    },
    memoryTextContainer: {
        height: 195,
        backgroundColor: 'white',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    memoryText: {
        fontSize: 30,
        textAlign: 'center',
        width: '90%'
    }
})
export default MemoryScreen;