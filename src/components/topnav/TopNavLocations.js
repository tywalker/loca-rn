import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TopNavLocations = () => {
  return (
    <View style={ styles.searchContainer }>
      <TouchableOpacity style={ styles.searchTouchContainer }>
        <Text>Search for locations...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Locations Search Container
  searchContainer: {
    flex: 0.8,
    borderWidth: 1,
    backgroundColor: "#e0e0e0",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  searchTouchContainer: {
    marginTop: 15,
    height: 45,
    flex: 0.85,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center'
  }
});

export default TopNavLocations;
