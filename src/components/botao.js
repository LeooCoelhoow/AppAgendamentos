import React from "react"
import { Button } from 'react-native'

function Botao(){    
    function executar(){        
        console.log('Exec #01!!!')        
    }

    return (
        <>
            <Button
                title="Executar #01!"
                onPress={executar}
            />
            <Button
                title="Executar #02!"
                onPress={function() {
                        console.log('Exec #02!!!')
                }}
            />

        </>
    )
}

export default Botao;