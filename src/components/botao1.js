import React, {useState} from "react"
import {Text,Button} from "react-native"

function Botao1(){
  const [num, att] = useState (0)
  function executar(){
    att(num+1)
    console.warn('Exec #01!!! ', num)
  }

  return (
    <>
    <Text>valor é {num}</Text>
    <Button
      title="01Executar #01!"
      onPress={executar}
      />
    </>
  )
}

export default Botao1;