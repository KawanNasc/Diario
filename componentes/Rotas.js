import { createStackNavigator } from '@react-navigation/stack';

import Home from '../telas/Home'; import Login from '../telas/Login'; import Cadastro from '../telas/Cadastro'; import Adicionar from '../telas/Adicionar'; import Alterar from '../telas/Alterar';

const Stack = createStackNavigator();

export default function Rotas() {

    return(

        <Stack.Navigator>

            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
            <Stack.Screen name="Adicionar" component={Adicionar} options={{headerShown: false}}/>
            <Stack.Screen name="Alterar" component={Alterar} options={{headerShown: false}}/>

        </Stack.Navigator>

    );

}