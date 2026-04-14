/**
 * ============================================================
 * App.tsx — Ponto de Entrada do Aplicativo
 * ============================================================
 *
 * Este é o componente raiz do app. Ele configura:
 *
 * 1. NavigationContainer — container principal do React Navigation
 *    que gerencia o estado de navegação e linking.
 *
 * 2. AppointmentsProvider — Context Provider que compartilha
 *    o estado de agendamentos entre todas as telas.
 *
 * 3. StatusBar — configura a barra de status do dispositivo
 *    com estilo escuro (dark-content) sobre fundo claro.
 *
 * 4. BottomTabs — navegação principal por abas que contém
 *    todas as telas do app.
 *
 * Hierarquia de componentes:
 * App
 *   └── AppointmentsProvider (Context)
 *         └── NavigationContainer
 *               └── BottomTabs (Tab Navigator)
 *                     ├── HomeStackNavigator
 *                     │     ├── HomeScreen
 *                     │     └── BookingScreen
 *                     ├── AppointmentsScreen
 *                     └── ProfileScreen
 * ============================================================
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppointmentsProvider } from './context/AppointmentsContext';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    /* Provider do contexto — todas as telas filhas têm acesso aos agendamentos */
    <AppointmentsProvider>
      {/* Container de navegação — obrigatório para o React Navigation funcionar */}
      <NavigationContainer>
        {/* StatusBar com texto escuro (para fundo claro) */}
        <StatusBar barStyle="dark-content" backgroundColor="#FFF5F7" />

        {/* Navegação principal por abas (Bottom Tabs) */}
        <BottomTabs />
      </NavigationContainer>
    </AppointmentsProvider>
  );
}
