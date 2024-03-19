import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Firebase from '../firebaseConfig';
import { estilizar } from '../componentes/EstilosGerais';

export default function Login({ navigation }) {

  const estilosGerais = estilizar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const auth = getAuth(Firebase);

  const autenticacao = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Inicio');
    } catch (error) {
      // Tratamento de erros
      console.error('Erro ao fazer login:', error);
    }
  };

  return (

    <SafeAreaView style={estilosGerais.container}>

       <View style={estilosGerais.content}>

        <View style={estilosGerais.vheader}>

          <View style={estilos.preheader}>

            <View style={estilos.vtexto}>

              <Text style={estilosGerais.t1}>Realize seu</Text>
              <Text style={estilosGerais.t2}>Login</Text>
              <Text style={estilosGerais.txt}>Digite seu email e senha.</Text>

            </View>

          </View>

          <Image source={require('../assets/img/login.png')} style={estilosGerais.nosz} />

        </View>

        <View style={estilos.vinputs}>
          <TextInput style={estilosGerais.input} placeholder='Email' cursorColor={'#E46216'} value={email} onChangeText={setEmail} autoCapitalize='none' />
          <TextInput style={estilosGerais.input} placeholder='Senha' cursorColor={'#E46216'} value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <View style={estilosGerais.buttonview}>
          
          <Text style={estilos.errorMessage}>{errorMessage}</Text>

          <TouchableOpacity style={estilos.buttonLogin} onPress={autenticacao}>
            <Text style={estilos.buttonTextLogin}>Fazer Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={estilos.linkCadastro}>Ou ainda não é cadastrado?</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

  );

}

const estilos = StyleSheet.create({

  vinputs: { flex: 1, justifyContent: 'flex-end' },

  buttonLogin: { backgroundColor: '#E46216', alignSelf: 'center', width: '75%', paddingVertical: 15, paddingHorizontal: 30, margin: 13, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 1, height: 10 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5, },

  buttonTextLogin: { color: '#f5f5f5', fontSize: 16, textAlign: 'center'  },

  linkCadastro: { marginTop: 7, fontSize: 15, color: '#ff8000', textDecorationLine: 'underline' },

  errorMessage: { color: '#f89a14', textAlign: 'center', marginBottom: 10, fontSize: 13 },

});