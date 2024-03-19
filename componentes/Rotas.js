import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../telas/Login";
import Cadastro from "../telas/Cadastro";

const Stack = createNativeStackNavigator()

export default function Routes() {

  return (

    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false, }} >

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />

    </Stack.Navigator>

  );
  
};