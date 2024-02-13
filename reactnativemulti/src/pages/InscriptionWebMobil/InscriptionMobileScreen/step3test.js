import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import requestLocationPermission from './PermissionGeo';

const GeoMapPicker = ({ selectedLatitude, selectedLongitude }) => {
  const [location, setLocation] = useState({
    latitude: selectedLatitude || 0,
    longitude: selectedLongitude || 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          (error) => {
            console.warn(`Error getting location: ${error.message}`);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    // Ceci s'exécute uniquement au montage et lorsque les props selectedLatitude et selectedLongitude changent
    if (!selectedLatitude || !selectedLongitude) {
      fetchLocation();
    } else {
      // Mise à jour de la localisation avec les nouvelles coordonnées sélectionnées
      setLocation({
        latitude: selectedLatitude,
        longitude: selectedLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedLatitude, selectedLongitude]);

  // Ajout d'une clé au composant MapView pour forcer sa recréation sur le changement de localisation
  const mapKey = `${location.latitude}-${location.longitude}`;

  return (
    <View style={styles.container}>
      <MapView
        key={mapKey} // Clé dynamique basée sur la localisation
        style={styles.map}
        region={location}
      >
        <Marker
          coordinate={location}
          title="Selected Location"
          description="This is the selected location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GeoMapPicker;
