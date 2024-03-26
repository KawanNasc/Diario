import { createStackNavigator } from '@react-navigation/stack';

import Home from '../telas/Home'; import Login from '../telas/Login'; import Cadastro from '../telas/Cadastro';

const Stack = createStackNavigator();

export default function Rotas() {

    return(

        <Stack.Navigator>

            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>

        </Stack.Navigator>

    );

}