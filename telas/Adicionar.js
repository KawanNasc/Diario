import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { estilizar } from "../componentes/EstilosGerais";
import firebaseConfig from '../componentes/firebaseConfig';

export default function Adicionar({navigation}) {

    const estilosGerais = estilizar();

    const [titulo, setTitulo] = useState(null);
    const [data, setData] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [local, setLocal] = useState(null);
    
    function addDiario() {

        firebaseConfig.collection("diario").add({

            titulo: titulo,
            data: data,
            descricao: descricao,
            local: local,

        });

        setTitulo({ titulo: "" });
        setData({ data: "" });
        setDescricao({ descricao: "" });
        setLocal({ local: "" });

        Alert,alert("Cadasto", "Registo adicionado com sucesso")
        navigation.navigate("Home");

    }

    return (

        <SafeAreaView style={estilosGerais.container}>

            <View>
                <Text style={estilosGerais.titulo}> Adicione seu registro de {'\n'} hoje </Text>
            </View>

            <View>

                <TextInput style={estilosGerais.input} placeholder="Digite o título" onChangeText={setTitulo} value="titulo" autoCapitalize="words"/>
                <TextInput style={estilosGerais.input} placeholder="Digite a data" onChangeText={setData} value="data" />
                <TextInput style={estilosGerais.input} placeholder="Digite a descrição" onChangeText={setDescricao} value="descricao" />
                <TextInput style={estilosGerais.input} placeholder="Digite o local" onChangeText={setLocal} value="local" />

                <TouchableOpacity style={estilosGerais.botao} onPress={() => { addDiario(); }}>
                    <Text style={estilosGerais.txtBotao}> Enviar </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    );
    

}