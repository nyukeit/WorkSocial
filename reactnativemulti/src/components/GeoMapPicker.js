import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import requestLocationPermission from './PermissionGeo';
import {GOOGLE_MAPS_API_KEY} from '@env';

const GeoMapPicker = ({onAddressSelect, selectedLatitude, selectedLongitude}) => {
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
         async position => {
           const {latitude, longitude} = position.coords;
           setLocation({
             latitude,
             longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           });

           // Après avoir défini la localisation, effectuer une géolocalisation inverse
           const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
           try {
             const response = await fetch(geocodeUrl);
             const data = await response.json();
             if (data.results.length > 0) {
               const address = data.results[0].formatted_address;
               onAddressSelect(address, latitude, longitude);
             }
           } catch (error) {
             console.error('Failed to fetch address', error);
           }
         },
         error => {
           console.warn(`Error getting location: ${error.message}`);
         },
         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
       );
     }
   };

   if (!selectedLatitude || !selectedLongitude) {
     fetchLocation();
   } else {
     setLocation({
       latitude: selectedLatitude,
       longitude: selectedLongitude,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     });
   }
 }, [selectedLatitude, selectedLongitude, onAddressSelect]);

  // Dans GeoMapPicker
  const handleDragEnd = async (e) => {
  const { latitude, longitude } = e.nativeEvent.coordinate;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.results.length > 0) {
      const address = data.results[0].formatted_address;
      onAddressSelect(address, latitude, longitude);
    }
  } catch (error) {
    console.error('Failed to fetch address', error);
  }
};


  // Ajout d'une clé au composant MapView pour forcer sa recréation sur le changement de localisation
  const mapKey = `${location.latitude}-${location.longitude}`;

  return (
    <View style={styles.container}>
      <MapView key={mapKey} style={styles.map} region={location}>
        <Marker
          coordinate={location}
          title="Selected Location"
          description="This is the selected location"
          draggable // Rendre le marqueur déplaçable
          onDragEnd={handleDragEnd} // Gérer la fin du déplacement
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
