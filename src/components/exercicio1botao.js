import React, {useState} from "react";
import { Button, Text, View } from "react-native";

function BotaoGeraInverte(){
  const [n1, setN1] = useState();
  const [n2, setN2] = useState();

  function gerarNumerosAleatorios(){
    const novoN1 = Math.floor(Math.random() * 100) + 1;
    const novoN2 = Math.floor(Math.random() * 100) + 1;
    
    setN1(novoN1);
    setN2(novoN2);

    console.log(novoN1, novoN2);
  }

  function inverter(){
    setN1(n2);
    setN2(n1);

    console.log(n2, n1);
  }

  return (
    <View>
      <Button
        title="Gerar números"
        onPress={gerarNumerosAleatorios}
      />
      <Text>Número N1 é: {n1}</Text>
      <Text>Número N2 é: {n2}</Text>
      <Button
        title="Inverter"
        onPress={inverter}
      />
    </View>
  );
}

export default BotaoGeraInverte;