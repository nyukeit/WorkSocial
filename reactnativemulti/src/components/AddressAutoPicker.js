import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
import {GOOGLE_MAPS_API_KEY} from '@env';

const AddressAutoPicker = ({ onAddressSelect }) => {
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
const handleSuggestionSelect = async (selectedSuggestion) => {
    const query = selectedSuggestion.description;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(nominatimUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = data[0];
        // Mise à jour de query avec l'adresse sélectionnée pour l'afficher dans le TextInput
        setQuery(selectedSuggestion.description);
        // Informer le composant parent de la sélection
        onAddressSelect(selectedSuggestion.description, selectedSuggestion, parseFloat(location.lat), parseFloat(location.lon));
      } else {
        console.log("No coordinates found for the address");
      }
    } catch (error) {
      console.error("Failed to fetch coordinates", error);
    }
  };


  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10 }}
        onChangeText={setQuery}
        value={query}
        placeholder="Entrez une adresse"
      />
      <ScrollView>
        {suggestions.map((suggestion, index) => (
          <Text
            key={index}
            onPress={() => handleSuggestionSelect(suggestion)}
          >
            {suggestion.description}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};


export default AddressAutoPicker;
