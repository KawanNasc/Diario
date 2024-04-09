import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { estilizar } from "../componentes/EstilosGerais";
import { getFirestore, collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../componentes/firebaseConfig';

const firestore = getFirestore();

export default function Alterar({ navigation, route }) {

    const estilosGerais = estilizar();

    const [titulo, setTitulo] = useState(route.params?.titulo || ''); 
    const [data, setData] = useState(route.params?.data || '');
    const [descricao, setDescricao] = useState(route.params?.descricao || '');
    const [local, setLocal] = useState(route.params?.local || '');
    
    function altDiario(titulo, data, descricao, local) {

        const id = route.params?.id; 

        if (!id) { Alert.alert("Erro", "ID do registro não encontrado. Por favor, tente novamente."); return }

        updateDoc(doc(collection(firestore, "diario"), id), {

            titulo: titulo,
            data: data,
            descricao: descricao,
            local: local
            
        })
        .then(() => { Alert.alert("Cadastro", "Registro alterado com sucesso"); navigation.navigate("Home"); })
        .catch((error) => { console.error("Erro ao atualizar registro:", error); Alert.alert("Erro", "Ocorreu um erro ao atualizar o registro. Por favor, tente novamente."); });

    }

    return (

        <SafeAreaView style={estilosGerais.container}>

            <View>
                <Text style={estilosGerais.titulo}>Altere seus registros</Text>
            </View>

            <View>

                <TextInput style={estilosGerais.input} placeholder="Digite o título" onChangeText={setTitulo} value={titulo} autoCapitalize="words"/>
                <TextInput style={estilosGerais.input} placeholder="Digite a data" onChangeText={setData} value={data} />
                <TextInput style={estilosGerais.input} placeholder="Digite a descrição" onChangeText={setDescricao} value={descricao} />
                <TextInput style={estilosGerais.input} placeholder="Digite o local" onChangeText={setLocal} value={local} />

                <TouchableOpacity style={estilosGerais.botao} onPress={() => navigation.navigate("Home")}>
                    <Text style={estilosGerais.txtBotao}> Voltar </Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilosGerais.botao} onPress={() => altDiario(titulo, data, descricao, local)}>
                    <Text style={estilosGerais.txtBotao}>Alterar</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}
