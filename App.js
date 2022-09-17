import { red } from '@mui/material/colors';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AppText from './AppText.js';
import * as Location from 'expo-location';
import { useState } from 'react';
import { useSyncExternalStore } from 'react';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar.js';

export default function App() {
  
  const [place, setPlace] = useState({
    name: '',
    temperature: '',
    countryCode: ''
  });

  const [north, setNorth] = useState(0);
  const [east, setEast] = useState(0);

  function findWeather() {
    Location.getCurrentPositionAsync().then((coords) => {
      let lat = coords.coords.latitude + north;
      let lon = coords.coords.longitude + east;
      fetch( 'http://api.geonames.org/findNearByWeatherJSON?lat=' + lat + '&lng=' + lon + '&radius=200&username=hansmariusoveras').then((response) => {
        response.json().then((json) => {
          if (json.weatherObservation == undefined) {
            return;
          }
          let the_place = {
            name: json.weatherObservation.stationName,
            temperature: json.weatherObservation.temperature,
            countryCode: json.weatherObservation.countryCode
          }
          setPlace(the_place);
          
        });
      })
    });
  }
  const position = [51.505, 0.09];
  return (
    <View style={styles.container}>
      <AppText>What is the nearby weather like?</AppText>
      <AppText>{place.name}, {place.countryCode}: {place.temperature} degrees.</AppText>
      <Pressable style={styles.button} onPress={findWeather}><AppText>Find weather</AppText></Pressable>
      <Pressable style={styles.button} onPress={() => {setEast(east-1); findWeather()}}><AppText>Go west</AppText></Pressable>
      <Pressable style={styles.button} onPress={() => {setEast(east+1); findWeather()}}><AppText>Go east</AppText></Pressable>
      <Pressable style={styles.button} onPress={() => {setNorth(north+1); findWeather()}}><AppText>Go north</AppText></Pressable>
      <Pressable style={styles.button} onPress={() => {setNorth(north-1); findWeather()}}><AppText>Go south</AppText></Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32
  },
  button: {
    backgroundColor: 'red',
    padding: '4px',
    borderRadius: 5,
    border: '1px solid black',
    margin: '12px'
  }
});
