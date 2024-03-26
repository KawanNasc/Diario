import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { estilizar } from '../componentes/EstilosGerais';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import firebaseConfig from '../componentes/firebaseConfig';
import { FlatList } from 'react-native-gesture-handler';

export default function Home({ navigation }) {

  const auth = getAuth();

  const estilosGerais = estilizar();

  function deleteDiario(id) {

    firebaseConfig.collection("diario").doc(id).delete();
    
    Alert.alert("Diário deletado");

  }

  useEffect(() => {

    firebaseConfig.collection("diario").onSnapshot((query => {

      const lista=[];
      query.forEach( doc => { lista.push({...doc.data(), id: doc.id}) });
      setDiario(lista);

    }))

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) { navigation.navigate('Login'); }
    });

    return () => unsubscribe(); 

  }, [auth, navigation]);

  const fazerLogout = async () => {

    try { await signOut(auth); } 
    catch (error) { console.error('Erro ao sair da conta:', error.message); }

  };

  return (

    <SafeAreaView style={estilosGerais.container}>

      <TouchableOpacity onPress={fazerLogout} style={estilos.sair}>
        <Ionicons name="log-out-outline" size={24} color="red" />
      </TouchableOpacity>

      <View style={estilosGerais.content}>

        <Text style={estilosGerais.titulo}> Sobre hj! </Text>
        <Text style={estilos.data}> Data: 25/03/2024 </Text>
        <Text style={estilos.descricao}> Um dia complicado, mas seguindo em frente! </Text>

      </View>

      <FlatList>



      </FlatList>

    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({

  data: { fontSize: 16, color: "#66b3ff", marginBottom: 5 },
  descricao: { fontSize: 20, fontWeight: 'bold', color: "#b366ff" },
  sair: { position: "absolute", top: 20,  left: 20, borderRadius: 20, padding: 10, zIndex: 1, color: "#ff0000" }

});