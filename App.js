/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    let exArr = [];
    for (var i = 0; i < 20; i++) {
      exArr.push(i);
    }
    return (
      <View style={styles.container}>
        <View style={ styles.topNavigation }>

        </View>
        <View style={ styles.mainViewContainer }>
          <ScrollView style={ styles.locationsContainer }>
            {
              exArr.map( (item, index) => {
                return (
                  <View key={index} style={ styles.location }>
                    <Text style={ styles.locaLabel }>Label { item }</Text>
                    <View style={ styles.locaImageContainer }>
                      <Image
                        source={{ uri: "https://placeimg.com/200/150/any" }}
                        style={{ height: 150, width: 200 }}
                      />
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  topNavigation: {
    flex: 0.2,
    backgroundColor: 'pink'
  },
  mainViewContainer: {
    flex: 0.8,
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  locationsContainer: {
    flex: 1,
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: 'green'
  },
  location: {
    height: 300,
  },
  locaLabel: {

  },
  locaImageContainer: {
    minHeight: 150,
    minWidth: 200
  }
});
