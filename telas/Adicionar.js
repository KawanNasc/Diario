import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { estilizar } from "../componentes/EstilosGerais";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Adicionar({navigation}) {

    const estilosGerais = estilizar();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const firestore = getFirestore();
    
    async function addDiario() {
        try {
          const docRef = await addDoc(collection(firestore, 'diario'), {
            titulo: titulo,
            descricao: descricao,
            data: data,
            local: local,
          });
          setTitulo('');
          setDescricao('');
          setData('');
          setLocal('');
          Alert.alert("Cadastro", "Diário adicionado com sucesso");
          navigation.navigate("Home");
        } catch (error) {
          console.error("Erro ao adicionar diário:", error.message);
          Alert.alert("Erro", "Ocorreu um erro ao adicionar o diário. Por favor, tente novamente.");
        }
      }

    return (

        <SafeAreaView style={estilosGerais.container}>

            <View>
                <Text style={estilosGerais.titulo}> Adicione seu registro de {'\n'} hoje </Text>
            </View>

            <View>

                <TextInput style={estilosGerais.input} placeholder="Digite o título" onChangeText={setTitulo} value={titulo} autoCapitalize="words"/>
                <TextInput style={estilosGerais.input} placeholder="Digite a data" onChangeText={setData} value={data} />
                <TextInput style={estilosGerais.input} placeholder="Digite a descrição" onChangeText={setDescricao} value={descricao}/>
                <TextInput style={estilosGerais.input} placeholder="Digite o local" onChangeText={setLocal}  value={local}/>

                <TouchableOpacity style={estilosGerais.botao} onPress={() => navigation.navigate("Home")}>
                    <Text style={estilosGerais.txtBotao}> Voltar </Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilosGerais.botao} onPress={() => { addDiario(); }}>
                    <Text style={estilosGerais.txtBotao}> Enviar </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    );
    

}