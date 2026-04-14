/**
 * ============================================================
 * screens/HomeScreen.tsx — Tela Inicial do App
 * ============================================================
 *
 * Tela principal que o usuário vê ao abrir o app.
 * Exibe uma saudação, a lista de serviços disponíveis
 * e os próximos agendamentos (se houver).
 *
 * Estrutura:
 * 1. Header — saudação "Olá, Bem-vinda! 💕"
 * 2. Seção "Nossos Serviços" — grid de ServiceCards
 * 3. Seção "Próximos Agendamentos" — AppointmentCards
 *
 * Navegação:
 * - Ao clicar em um ServiceCard, navega para BookingScreen
 *   passando o serviço selecionado como parâmetro
 *
 * Usa o hook useAppointments() para ler os agendamentos
 * salvos no contexto global.
 * ============================================================
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme/colors';
import { HomeStackParamList } from '../types';
import { services } from '../servicos/services';
import { useAppointments } from '../context/AppointmentsContext';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import AppointmentCard from '../components/AppointmentCard';

/** Tipo de navegação para esta tela (tipagem segura) */
type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

export default function HomeScreen() {
  /** Hook de navegação para navegar para a tela de agendamento */
  const navigation = useNavigation<HomeNavigationProp>();

  /** Lê os agendamentos do contexto global */
  const { appointments } = useAppointments();

  /**
   * Filtra apenas os agendamentos futuros (pendentes ou confirmados)
   * para mostrar na seção "Próximos Agendamentos"
   */
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'pendente' || apt.status === 'confirmado'
  );

  return (
    <View style={styles.container}>
      {/* ──────────── HEADER ──────────── */}
      <Header
        title="Olá, Bem-vinda! 💕"
        subtitle="Agende seus serviços de beleza"
      />

      {/* ──────────── CONTEÚDO PRINCIPAL (SCROLLÁVEL) ──────────── */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}    // Esconde a barra de scroll
        contentContainerStyle={styles.scrollContent}
      >
        {/* ──── Seção: Nossos Serviços ──── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💅 Nossos Serviços</Text>
          <Text style={styles.sectionSubtitle}>
            Escolha o serviço e agende seu horário
          </Text>
        </View>

        {/* Lista de ServiceCards — um para cada serviço */}
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onPress={() => {
              // Navega para a tela de agendamento passando o serviço
              navigation.navigate('Booking', { service });
            }}
          />
        ))}

        {/* ──── Seção: Próximos Agendamentos ──── */}
        {upcomingAppointments.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📋 Próximos Agendamentos</Text>
            </View>

            {/* Lista de AppointmentCards */}
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </>
        )}

        {/* Espaço extra no final para o conteúdo não ficar colado no bottom tab */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

/**
 * Estilos da HomeScreen
 *
 * Container principal com fundo rosado (background).
 * ScrollView ocupa todo o espaço disponível.
 * Seções com tipografia consistente.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,                                    // Ocupa toda a tela
    backgroundColor: Colors.background,         // Fundo rosado suave
  },
  scrollView: {
    flex: 1,                                    // ScrollView ocupa o restante
  },
  scrollContent: {
    paddingTop: 20,                             // Espaço acima do primeiro card
  },
  section: {
    paddingHorizontal: 20,                      // Padding lateral da seção
    marginBottom: 16,                           // Espaço abaixo do título da seção
    marginTop: 8,                               // Espaço acima
  },
  sectionTitle: {
    fontSize: 20,                               // Título de seção grande
    fontWeight: '700',                          // Bold
    color: Colors.textPrimary,                  // Texto escuro
  },
  sectionSubtitle: {
    fontSize: 14,                               // Subtítulo menor
    color: Colors.textSecondary,                // Cinza
    marginTop: 4,                               // Pequeno espaço acima
  },
  bottomSpacer: {
    height: 30,                                 // Espaço no final do scroll
  },
});
