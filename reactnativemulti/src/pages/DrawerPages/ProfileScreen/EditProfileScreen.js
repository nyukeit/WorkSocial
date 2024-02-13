import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useUser } from '../../../useContexte/ContexteUserId';
import CustomImagePicker from '../../../components/CustomImagePicker';

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const { userId, token } = useUser(); // Utilisez useUser pour accéder au userId et au token

  const [editedUser, setEditedUser] = useState({ ...user });
  const [isSaving, setIsSaving] = useState(false);

const saveChanges = () => {
  setIsSaving(true);

  fetch(`http://192.168.1.62:3000/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      FirstName: editedUser.FirstName,
      LastName: editedUser.LastName,
      BirthDate: editedUser.BirthDate,
      Address: editedUser.Address,
      Email: editedUser.Email,
      // Assurez-vous que la gestion de ProfileImage est correctement implémentée côté serveur
      ProfileImage: editedUser.ProfileImage,
    }),
  })
  .then((response) => {
    console.log("Raw response: ", response);
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error('Erreur de requête : ' + text);
      });
    }
    return response.json();
  })
  .then((data) => {
    setIsSaving(false);
    if (data.success) {
      navigation.goBack();
    } else {
      console.error('Erreur de sauvegarde :', data.error);
    }
  })
  .catch((error) => {
    setIsSaving(false);
    console.error('Erreur de sauvegarde :', error);
  });
};


 const onImageSelected = (imageUri) => {
    setEditedUser({...editedUser, ProfileImage: imageUri});
  };

  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const toggleImagePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };
  return (
    <View style={styles.container}>
      {/* image */}
     <TouchableOpacity onPress={toggleImagePicker}>
        <Image
          style={styles.image}
          source={{ uri: editedUser.ProfileImage || 'url_de_votre_image_par_defaut' }}
        />
      </TouchableOpacity>

      {/* Afficher CustomImagePicker pour sélectionner une nouvelle image */}
      {isPickerVisible && (
        <CustomImagePicker onImageSelected={onImageSelected} />
      )}



{/* firstName */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, FirstName: text })}
        value={editedUser.FirstName}
      />
{/* lastName */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, LastName: text })}
        value={editedUser.LastName}
      />
{/* username */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, Username: text })}
        value={editedUser.Username}
      />
{/* birthDate */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, BirthDate: text })}
        value={editedUser.BirthDate}
      />
{/* address */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, Address: text })}
        value={editedUser.Address}
      />
{/* phone */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, Phone: text })}
        value={editedUser.Phone}
      />
{/* biography */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedUser({ ...editedUser, Biography: text })}
        value={editedUser.Biography}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveChanges}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
  width: 100,
  height: 100,
},
});

export default EditProfileScreen;
