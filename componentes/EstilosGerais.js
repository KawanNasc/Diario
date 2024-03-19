import { StyleSheet } from "react-native";

export const estilizar = () => {

    return StyleSheet.create({

        container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
        
        vheader: { flexDirection: 'row', justifyContent: 'space-between' },

        voltar: { width: 34, height: 40, margin: 10 },

        nosz: { width: 170, height: 170, alignSelf: 'flex-end', zIndex: -1 },

        t1: { textAlign: 'left', fontSize: 35, fontWeight: 'bold', color: '#000', alignSelf: 'flex-start' },

        t2: { textAlign: 'left', fontSize: 35, alignSelf: 'flex-start', color: '#e36216' },

        txt: { fontSize: 18, color: '#565656', alignSelf: 'flex-start' },

        input: { borderBottomColor: '#000000', borderBottomWidth: 1, color: '#131313', height: 35, fontSize: 19, margin: 15 },
        
        content: { flex: 1, justifyContent: 'space-between', backgroundColor: '#ecf0f1', margin: 10, padding: 18, width: '100%', height: '100%' },
        
        buttonview: { flexDirection: 'column', justifyContent: 'space-between', justifyContent: 'center', alignItems: 'center' },

    });

}