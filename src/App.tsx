import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BotaoGeraInverte from './components/exercicio1botao';

export default function App() {
  const [cont2, atribua2] = useState(57)


  return (
    <View style={styles.container}>
      <Text>OPA</Text>
      <BotaoGeraInverte/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdbdbdff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
