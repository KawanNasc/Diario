import { StyleSheet } from "react-native";
import { useFonts, DeliusUnicase_400Regular } from '@expo-google-fonts/delius-unicase';
import { KottaOne_400Regular } from '@expo-google-fonts/kotta-one';

export const estilizar = () => {

    let [ fontsLoaded, fontError ] = useFonts({ DeliusUnicase_400Regular, KottaOne_400Regular }) 

    if ( !fontsLoaded && !fontError ) { return {}; }
    else {

        return StyleSheet.create({

            container: { flex: 1, backgroundColor: '#003399', alignItems: 'center', justifyContent: 'center' },

            content: { backgroundColor: '#004d00', borderRadius: 10, padding: 20, width: '80%', maxWidth: 400, alignItems: 'center' },

            titulo: { fontFamily: "DeliusUnicase_400Regular", fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#b3ff66' },

            dados: { fontFamily: "KottaOne_400Regular", color: "#4dff4d", fontSize: 16, alignSelf: 'flex-start', marginBottom: 5, width: '100%' },

            input: { backgroundColor: '#99ff99', borderRadius: 8, width: 215, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, color: '#3E4E5E'  },
            
            botao: { backgroundColor: "#66cc00", borderRadius: 8, width: '100%', paddingVertical: 12, alignItems: 'center', margin: 5 },

            txtBotao: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },

            msgErro: { color: '#FF4242', marginTop: 10 },

        })

    }
    
}