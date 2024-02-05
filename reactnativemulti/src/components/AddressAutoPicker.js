import React, {useState, useEffect} from 'react';
import {View, TextInput, ScrollView, Text, StyleSheet} from 'react-native';
import {GOOGLE_MAPS_API_KEY} from '@env';

const AddressAutoPicker = ({onAddressSelect, selectedAddress}) => {
  const [query, setQuery] = useState('');

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      const fetchAddresses = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
              query,
            )}&key=${GOOGLE_MAPS_API_KEY}&language=fr`,
          );
          if (response.ok) {
            const data = await response.json();
            setSuggestions(data.predictions);
          } else {
            console.error('Failed to fetch data');
            setSuggestions([]);
          }
        } catch (error) {
          console.error(error);
          setSuggestions([]);
        }
      };

      fetchAddresses();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Remplacez l'utilisation de l'API Google Places par une fonction qui simule la sélection d'une adresse et récupère ses coordonnées.
  const handleSuggestionSelect = async selectedSuggestion => {
    const query = selectedSuggestion.description;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query,
    )}`;

    try {
      const response = await fetch(nominatimUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = data[0];
        // Mise à jour de query avec l'adresse sélectionnée pour l'afficher dans le TextInput
        setQuery(selectedSuggestion.description);
        // Informer le composant parent de la sélection
        onAddressSelect(
          selectedSuggestion.description,
          selectedSuggestion,
          parseFloat(location.lat),
          parseFloat(location.lon),
        );

        // Vider les suggestions pour qu'elles ne s'affichent plus
        setSuggestions([]);
      } else {
        console.log('No coordinates found for the address');
      }
    } catch (error) {
      console.error('Failed to fetch coordinates', error);
    }
  };
  useEffect(() => {
    setQuery(selectedAddress || '');
  }, [selectedAddress]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setQuery}
        value={query}
        placeholder="Entrez une adresse"
      />
      <ScrollView style={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
          <Text
            key={index}
            onPress={() => handleSuggestionSelect(suggestion)}
            style={styles.suggestion}>
            {suggestion.description}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

// Définition des styles
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  suggestionsContainer: {
    maxHeight: 200,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '100%',
    position: 'absolute',
    top: 45,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default AddressAutoPicker;
