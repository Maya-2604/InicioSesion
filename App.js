import React from 'react'; 
import { useState } from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker'; 
import * as Sharing from 'expo-sharing'; 

const App = () => { 
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUri, setImageUri] = useState( 'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg' ); 
  
  const pickerImageGaleria = async () => { 
    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      aspect: [4, 3], 
      quality: 1, 
    }); 
    
    if (!result.canceled) { 
      setImageUri(result.uri); 
    } 
  }; 

  const pickerImageFoto = async (fromCamera = false) => { 
    let result; 
    if (fromCamera) { 
      result = await ImagePicker.launchCameraAsync({ 
        allowsEditing: true, 
        aspect: [4, 3], 
        quality: 1, 
      }); 
    } else { 
      result = await ImagePicker.launchImageLibraryAsync({ 
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: true, 
        aspect: [4, 3], 
        quality: 1, 
      }); 
    } 

    if (!result.canceled) { 
      setImageUri(result.uri); 
    } 
  }; 
  
  const openImagePickerAsync = async () => { 
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
    if (permissionResult.granted === false) { 
      alert('Permisos son requeridos'); 
      return; 
    } 

    const pickerResult = await ImagePicker.launchImageLibraryAsync(); 
    if (!pickerResult.canceled) { 
      setSelectedImage({ localUri: pickerResult.uri }); 
    } 
  }; 

  return ( 
    <View style={styles.container}> 
      <View style={styles.subcontainer}> 
        <Text style={styles.title}>Inicio de Sesión</Text> 
        <TouchableOpacity onPress={pickerImageGaleria}> 
          <Image source={{ uri: imageUri }} style={styles.image} /> 
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => Sharing.shareAsync(imageUri)} style={styles.buttonGray}> 
          <Text style={styles.buttontext}>COMPARTIR</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.buttonGray} onPress={() => pickerImageFoto(true)}> 
          <Text style={styles.buttontext}>TOMAR UNA FOTO</Text> 
        </TouchableOpacity> 
        <View style={styles.subcontainer2}> 
          <Text style={styles.subtitle}>Nombre de usuario:</Text> 
          <TextInput style={styles.input} placeholder='Nombre' placeholderTextColor="#fff" /> 
          <Text style={styles.subtitle}>Contraseña:</Text> 
          <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry placeholderTextColor="#fff" /> 
        </View> 
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Usuario Registrado')}> 
          <Text style={styles.buttontext}>ACEPTAR</Text> 
        </TouchableOpacity> 
      </View> 
    </View> 
  ); 
};

const styles = StyleSheet.create({ 
  container: {  
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: { 
    borderColor: '#ccc',
    backgroundColor: '#2b2b2b',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  subcontainer2: {
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#b58db6',
    marginBottom: 20,
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 90,
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: '#b58db6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: { 
    padding: 5,
    height: 25,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#444',
    color: '#adafb1', 
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#b58db6',
    borderWidth: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#fff', 
  },
  button: {
    height: 30,
    width: 90,
    backgroundColor: '#b58db6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonGray: {
    height: 30,
    width: 120,
    backgroundColor: '#808080', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttontext: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default App;
