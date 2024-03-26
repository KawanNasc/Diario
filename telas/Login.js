import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { estilizar } from "../componentes/EstilosGerais";
import firebaseConfig from '../componentes/firebaseConfig';
const app = initializeApp(firebaseConfig);

export default function Login({navigation}) {

    const [email,setEmail] = useState(''); const [senha,setSenha] = useState(''); const [errorMessage, setErrorMessage] = useState('');

    const estilosGerais = estilizar();

    const navegarParaCadastro = () => { navigation.navigate('Cadastro'); };

    const realizarLogin = async () => {

        try {

          const auth = getAuth(app);
          await signInWithEmailAndPassword(auth, email, senha);
          navigation.navigate('Home');

        } catch (error) {

          if (error.code === 'auth/invalid-credential') { setErrorMessage('E-Mail || Senha incorretos.'); } 
          else if (error.code === 'auth/invalid-email') { setErrorMessage('Insira um email válido.'); } 
          else if (error.code === 'auth/user-not-found') { setErrorMessage('E-Mail não cadastrado.'); } 
          else if (error.code === 'auth/missing-password') { setErrorMessage('Insira a senha.'); } 
          else { setErrorMessage(error.message); }
          console.error('Erro ao fazer login:', error);

        }

      };


    return (

        <SafeAreaView style={estilosGerais.container}>

            <View style={estilosGerais.content}>

                <Text style={estilosGerais.titulo}> Marque seus acontecimentos da vida neste diário </Text>

                <Text style={estilosGerais.dados}> Email </Text>
                <TextInput style={estilosGerais.input} placeholder="Digite o email" onChangeText={(email)=>setEmail(email)} value={email} />

                <Text style={estilosGerais.dados}> Senha </Text>
                <TextInput style={estilosGerais.input} placeholder="Digite a Senha" onChangeText={(senha)=>setSenha(senha)} value={senha} secureTextEntry />

                <TouchableOpacity style={estilosGerais.botao} onPress={realizarLogin}>
                  <Text style={estilosGerais.txtBotao}> Entrar </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navegarParaCadastro}>
                  <Text style={estilosGerais.cadastrar}> Realize aqui seu cadastro </Text>
                </TouchableOpacity>

                { errorMessage ? <Text style={estilosGerais.msgErro}> {errorMessage} </Text> : null }

            </View>

        </SafeAreaView>
    );
}