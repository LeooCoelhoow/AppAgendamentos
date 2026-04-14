/**
 * ============================================================
 * screens/BookingScreen.tsx — Tela de Agendamento
 * ============================================================
 *
 * Tela onde o usuário completa o agendamento de um serviço.
 * Recebe o serviço selecionado via parâmetros de navegação.
 *
 * Fluxo:
 * 1. Exibe informações do serviço selecionado no topo
 * 2. Usuário seleciona uma DATA (DateSelector)
 * 3. Usuário seleciona um HORÁRIO (TimeSlotGrid)
 * 4. Confirma o agendamento (PinkButton)
 * 5. Agendamento é salvo no contexto e navega de volta
 *
 * Validação:
 * - Botão só fica habilitado se data E horário forem selecionados
 * - Alert de confirmação ao salvar com sucesso
 * ============================================================
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { HomeStackParamList } from '../types';
import { useAppointments } from '../context/AppointmentsContext';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import TimeSlotGrid from '../components/TimeSlotGrid';
import PinkButton from '../components/PinkButton';

/** Tipo da rota para acessar os parâmetros de navegação */
type BookingRouteProp = RouteProp<HomeStackParamList, 'Booking'>;

export default function BookingScreen() {
  /** Acessa os parâmetros da rota (serviço selecionado) */
  const route = useRoute<BookingRouteProp>();
  const { service } = route.params;

  /** Hook de navegação para voltar à tela anterior */
  const navigation = useNavigation();

  /** Hook para adicionar agendamento ao contexto global */
  const { addAppointment } = useAppointments();

  // ──────────────────────────────────────────────
  // Estado local da tela
  // ──────────────────────────────────────────────

  /** Data selecionada pelo usuário (formato "YYYY-MM-DD") */
  const [selectedDate, setSelectedDate] = useState<string>('');

  /** Horário selecionado pelo usuário (formato "HH:00") */
  const [selectedTime, setSelectedTime] = useState<string>('');

  /**
   * Verifica se o botão de confirmar deve estar habilitado
   * Só habilita se AMBOS data e horário foram selecionados
   */
  const isFormValid = selectedDate !== '' && selectedTime !== '';

  /**
   * handleConfirm — Processa a confirmação do agendamento
   *
   * 1. Cria um objeto Appointment com ID único (timestamp)
   * 2. Adiciona ao contexto global via addAppointment()
   * 3. Exibe Alert de sucesso
   * 4. Navega de volta para a tela Home
   */
  const handleConfirm = () => {
    // Cria o agendamento com ID baseado no timestamp atual
    const newAppointment = {
      id: Date.now().toString(),       // ID único baseado no timestamp
      service: service,                 // Serviço selecionado (vem da navegação)
      date: selectedDate,               // Data selecionada pelo usuário
      time: selectedTime,               // Horário selecionado pelo usuário
      status: 'confirmado' as const,    // Status inicial como confirmado
    };

    // Salva o agendamento no contexto global
    addAppointment(newAppointment);

    // Formata a data para exibição no Alert (DD/MM/YYYY)
    const [year, month, day] = selectedDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Exibe Alert de confirmação
    Alert.alert(
      'Agendamento Confirmado! ✅',
      `${service.name}\n📅 ${formattedDate} às ${selectedTime}\n💰 R$ ${service.price.toFixed(2).replace('.', ',')}`,
      [
        {
          text: 'OK',
          // Volta para a tela Home ao fechar o Alert
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* ──────────── HEADER ──────────── */}
      <Header
        title="Agendar Serviço"
        subtitle="Escolha a data e o horário"
      />

      {/* ──────────── CONTEÚDO PRINCIPAL ──────────── */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ──── Info do Serviço Selecionado ──── */}
        <View style={styles.serviceInfo}>
          {/* Emoji grande do serviço */}
          <View style={styles.serviceIconContainer}>
            <Text style={styles.serviceIcon}>{service.icon}</Text>
          </View>

          {/* Nome e detalhes do serviço */}
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDesc} numberOfLines={2}>
              {service.description}
            </Text>
            {/* Preço e duração */}
            <View style={styles.serviceMeta}>
              <Text style={styles.servicePrice}>
                R$ {service.price.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={styles.serviceDuration}>
                ⏱ {service.duration} min
              </Text>
            </View>
          </View>
        </View>

        {/* ──── Seletor de Data ──── */}
        <DateSelector
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}       // Atualiza o estado ao selecionar
        />

        {/* ──── Grade de Horários ──── */}
        <TimeSlotGrid
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}       // Atualiza o estado ao selecionar
        />

        {/* ──── Botão de Confirmar ──── */}
        <PinkButton
          title="Confirmar Agendamento ✨"
          onPress={handleConfirm}
          disabled={!isFormValid}               // Desabilitado se algum campo estiver vazio
        />

        {/* Espaço no final */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

/**
 * Estilos da BookingScreen
 *
 * Card de serviço no topo com layout horizontal.
 * DateSelector e TimeSlotGrid abaixo com espaçamento generoso.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,         // Fundo rosado suave
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  // ──── Card de informações do serviço ────
  serviceInfo: {
    flexDirection: 'row',                        // Layout horizontal
    alignItems: 'center',
    backgroundColor: Colors.surface,             // Fundo branco
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    // Sombra
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 60,                                   // Container do emoji maior
    height: 60,
    borderRadius: 18,
    backgroundColor: Colors.accent,              // Fundo rosa pastel
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  serviceIcon: {
    fontSize: 28,                                // Emoji grande
  },
  serviceDetails: {
    flex: 1,                                     // Ocupa o espaço restante
  },
  serviceName: {
    fontSize: 18,                                // Nome do serviço
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginBottom: 6,
  },
  serviceMeta: {
    flexDirection: 'row',                        // Preço e duração lado a lado
    alignItems: 'center',
    gap: 12,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,                       // Rosa — destaque
  },
  serviceDuration: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomSpacer: {
    height: 40,
  },
});
