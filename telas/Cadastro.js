import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen';
import { initializeApp } from '@firebase/app';
import firebaseConfig from '../firebaseConfig';
import { estilizar } from '../componentes/EstilosGerais';

const app = initializeApp(firebaseConfig);

export default function Cadastro({ navigation }) {


  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
  
    loadResourcesAndDataAsync(); 
  }, []); 
  
  
  // ESTILOS
  const estilosGerais = estilizar();

  // PEGAR DADOS DO USUÁRIO
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = getAuth(app);

  // INICIO CÓDIGO DE CADASTRO
  const handleCadastro = async () => {
    try {
      if (password == "" || confirmPassword == "") {
          setErrorMessage('Preencha todos os campos');
          return;
      }
      if (password != confirmPassword) {
        setErrorMessage('As senhas não coincidem');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Cadastro realizado com sucesso', 'Usuário criado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Este email já está cadastrado');
      }
      else if (error.code === 'auth/weak-password') {
        setErrorMessage('A senha deve conter pelo menos 6 caracteres');
      }
     else if (error.code === 'auth/invalid-email'){
      setErrorMessage('Por favor, insira um email válido');
    }
    else if (error.code === 'auth/missing-email'){
      setErrorMessage('Por favor, insira um email.');
      } 
      else{
        setErrorMessage(error.message);
      }
      console.error('Erro ao fazer cadastro:', error.message);
    }
  };
  
  return (
    <SafeAreaView style={estilosGerais.container}>
         
       <View style={estilosGerais.content}>
        <View style={estilosGerais.vheader}>
          <View style={estilos.preheader}>
            <View style={estilos.vgoback}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login', { title: 'Login' })}
              >
                <Image source={require('../assets/img/voltar.png')} style={estilosGerais.voltar} />
              </TouchableOpacity>
            </View>
            <View style={estilos.vtexto}>
              <Text style={estilosGerais.t1}>Realize seu</Text>
              <Text style={estilosGerais.t2}>Cadastro</Text>
              <Text style={estilosGerais.txt}>Digite seu email e senha.</Text>
            </View>
          </View>
          <Image source={require('../assets/img/login.png')} style={estilosGerais.nosz} />
        </View>
        <View style={estilos.vinputs}>

          <TextInput style={estilosGerais.input} placeholder='Email' cursorColor={'#E46216'} value={email} onChangeText={setEmail} autoCapitalize='none'/>
          <TextInput style={estilosGerais.input} placeholder='Senha' cursorColor={'#E46216'} value={password} onChangeText={setPassword} secureTextEntry/>
          <TextInput style={estilosGerais.input} placeholder='Confirmar Senha' cursorColor={'#E46216'} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        </View>

        <View style={estilosGerais.buttonview}>

        <Text style={estilos.errorMessage}>{errorMessage}</Text>
        
          <TouchableOpacity style={estilos.buttonCadastro} onPress={handleCadastro}>
            <Text style={estilos.buttonTextCadastro}>Cadastrar</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

  );

}


const estilos = StyleSheet.create({

  vinputs: { flex: 1, justifyContent: 'flex-end', marginBottom: 10 },

  buttonCadastro: { backgroundColor: '#479d32', alignSelf: 'center', width: '75%', paddingVertical: 15, paddingHorizontal: 30, margin: 13, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 1, height: 10 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },

  buttonTextCadastro: { color: '#f5f5f5', fontSize: 18, textAlign: 'center' },

  errorMessage: { color: '#ff8000', textAlign: 'center', marginBottom: 5, fontSize: 13 }

});