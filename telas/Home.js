import { Text, StyleSheet, SafeAreaView, View } from 'react-native';

export default function Home() {

  return (

   <SafeAreaView style={estilos.container}>

      <View>

        <Text style= {estilos.titulo}> Agenda de Contatos </Text>

      </View>

    </SafeAreaView>

  );

}
const estilos = StyleSheet.create({
  
  container: { flex: 1, justifyContent:"center", alignItens:"center", padding: 8, backgroundColor: '#add8e6' }, 

  titulo: { flex: 1, justifyContent:"center", alignItens:"center", padding: 18,  fontSize: 50 },
  
});