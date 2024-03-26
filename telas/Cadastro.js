import React, { useState } from "react";
import { SafeAreaView, Alert, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { estilizar } from "../componentes/EstilosGerais";
import firebaseConfig from '../componentes/firebaseConfig';

const app = initializeApp(firebaseConfig);

export default function Cadastro({navigation}) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth(app);

    const estilosGerais = estilizar();
  
    const realizarCadastro = async () => {

      try {

        if ( senha === "" || confirmSenha === "" ) { setErrorMessage('Preencha todos os campos'); return; }
        if ( senha !== confirmSenha ) { setErrorMessage('As senhas não coincidem'); return; }

        await createUserWithEmailAndPassword(auth, email, senha);
        Alert.alert('Cadastro realizado com sucesso', 'Usuário criado com sucesso');
        navigation.navigate('Login');

      } catch (error) {

        if (error.code === 'auth/email-already-in-use') { setErrorMessage('Este email já está cadastrado'); }
        else if (error.code === 'auth/weak-password') { setErrorMessage('A senha deve conter +=6 caracteres'); }
        else if (error.code === 'auth/invalid-email') { setErrorMessage('Por favor, insira um email válido'); }
        else if (error.code === 'auth/missing-email') { setErrorMessage('Por favor, insira um email.'); } 
        else { setErrorMessage(error.message); }

        console.error('Erro ao fazer cadastro:', error.message);

      }

    };
  

    return (

        <SafeAreaView style={estilosGerais.container}>

            <View style={estilosGerais.content}>

                <Text style={estilosGerais.titulo}>Faça seu cadastro</Text>

                <Text style={estilosGerais.dados}>Email</Text>
                <TextInput style={estilosGerais.input} placeholder="Digite o email" value={email} onChangeText={setEmail} />

                <Text style={estilosGerais.dados}>Senha</Text>
                <TextInput style={estilosGerais.input} placeholder="Digite a Senha" value={senha} onChangeText={setSenha} secureTextEntry />

                <Text style={estilosGerais.dados}>Confirmar Senha</Text>
                <TextInput style={estilosGerais.input} placeholder='Confirmar Senha' value={confirmSenha} onChangeText={setConfirmSenha} secureTextEntry />

                <TouchableOpacity style={estilosGerais.botao} onPress={realizarCadastro}>
                    <Text style={estilosGerais.txtBotao}>Cadastrar</Text>
                </TouchableOpacity>

                { errorMessage ? <Text style={estilosGerais.msgErro}> {errorMessage} </Text> : null }

            </View>

        </SafeAreaView>
    );
}