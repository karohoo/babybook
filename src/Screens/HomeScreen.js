import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('memory.db');

function HomeScreen() {
  const [memories, setMemories] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from memory;', [], (_, { rows }) =>
        setMemories(rows._array)
      );
    });
  })
  _renderItem = ({ item, index }) => {
    if (item.picture != "") {
      return (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.picture }} />
          <Card.Content style={styles.cardContent}>
            <Title style={styles.text}>{item.date}</Title>
            <Paragraph style={styles.text}>{item.subject}</Paragraph>
          </Card.Content>
        </Card>
      );
    }
  }
  return (
    <View style={styles.container}>
      <Carousel
        style={styles.carousel}
        ref={(c) => { this._carousel = c; }}
        data={memories}
        renderItem={this._renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        sliderWidth={350}
        itemWidth={300}
        contentContainerCustomStyle={{ alignItems: 'center' }}
      />
      <Pagination
        dotsLength={memories.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.pagination}
        dotStyle={styles.dot}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    borderWidth: 1,
    borderColor: '#d6d7da',
    marginTop: 10
  },
  cardContent: {
    backgroundColor: '#202020'
  },
  text: {
    color: 'white'
  },
  carousel: {
    alignSelf: "center",
    alignItems: "center"
  },
  pagination: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 0
  },
  dot: {
    backgroundColor: 'black'
  }
})
export default HomeScreen;