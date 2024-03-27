import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import Firebase from '../componentes/firebaseConfig';
import { estilizar } from '../componentes/EstilosGerais';

export default function Home({ navigation }) {
  
  const auth = getAuth();
  const [diario, setDiario] = useState([]);
  const estilosGerais = estilizar();
  const firestore = getFirestore()

  function deleteDiario(id) {

    deleteDoc(doc(collection(Firebase, 'diario'), id))

      .then(() => {  Alert.alert('Diário deletado'); })
      .catch((error) => { console.error('Erro ao deletar diário:', error.message); });

  }

  useEffect(() => {

    const unsubscribeDiario = onSnapshot(collection(firestore, 'diario'), (querySnapshot) => {

      const lista = [];
      querySnapshot.forEach((doc) => { lista.push({ ...doc.data(), id: doc.id }); });
      setDiario(lista);

    }); 

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) { navigation.navigate('Login'); }
    });

    return () => { unsubscribeDiario(); unsubscribeAuth(); };

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
        <Text style={estilosGerais.dados}> Data: 25/03/2024 </Text>
        <Text style={estilosGerais.dados}> Um dia complicado, mas seguindo em frente! </Text>

      </View>

      <FlatList data={diario} renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Alterar', {

                id: item.id,
                data: item.data.toDate(),
                descricao: item.descricao,
                local: item.local,

          }) }>

            <SafeAreaView>

              <View style={estilos.lista}>

                <Text style={estilosGerais.titulo}> Título: {item.titulo} </Text>
                <Text style={estilosGerais.dados}> Data: {item.data.toDate().toLocaleDateString()} </Text>
                <Text style={estilosGerais.dados}> Descrição: {item.descricao} </Text>
                <Text style={estilosGerais.dados}> Local: {item.local} </Text>

              </View>

            </SafeAreaView>

          </TouchableOpacity>

          <View style={estilosGerais.botao}>

            <TouchableOpacity onPress={() => deleteDiario(item.id)}>
              <MaterialCommunityIcons name="delete-empty" size={70} color="red" />
            </TouchableOpacity>

          </View>

        </View>

      )} />

      <View style={estilosGerais.botao}>

        <TouchableOpacity onPress={() => navigation.navigate("Adicionar")}>
          <MaterialCommunityIcons name="plus-circle-outline" size={70} color="green" />
        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}

const estilos = StyleSheet.create({

  data: { fontSize: 16, color: "#66b3ff", marginBottom: 5 },
  descricao: { fontSize: 20, fontWeight: 'bold', color: "#b366ff" },
  sair: { position: "absolute", top: 20,  left: 20, borderRadius: 20, padding: 10, zIndex: 1, color: "#ff0000" },
  lista: { margin: 10, padding: 10 },


});