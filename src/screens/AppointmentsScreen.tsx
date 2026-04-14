/**
 * ============================================================
 * screens/AppointmentsScreen.tsx — Tela Meus Agendamentos
 * ============================================================
 *
 * Tela que lista todos os agendamentos marcados pelo usuário.
 * Os agendamentos são separados em duas seções:
 *
 * 1. "Próximos" — agendamentos pendentes e confirmados
 * 2. "Concluídos" — agendamentos já realizados
 *
 * Se não houver nenhum agendamento, exibe uma mensagem
 * amigável incentivando o usuário a agendar um serviço.
 *
 * Lê os dados do contexto global (AppointmentsContext).
 * ============================================================
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import { useAppointments } from '../context/AppointmentsContext';
import Header from '../components/Header';
import AppointmentCard from '../components/AppointmentCard';

export default function AppointmentsScreen() {
  /** Lê todos os agendamentos do contexto global */
  const { appointments } = useAppointments();

  /**
   * Separa os agendamentos em duas categorias:
   * - upcoming: pendentes e confirmados (ainda vão acontecer)
   * - completed: concluídos (já aconteceram)
   */
  const upcoming = appointments.filter(
    (apt) => apt.status === 'pendente' || apt.status === 'confirmado'
  );

  const completed = appointments.filter(
    (apt) => apt.status === 'concluido'
  );

  return (
    <View style={styles.container}>
      {/* ──────────── HEADER ──────────── */}
      <Header
        title="Meus Agendamentos"
        subtitle="Acompanhe seus serviços marcados"
      />

      {/* ──────────── CONTEÚDO PRINCIPAL ──────────── */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ──── Estado Vazio ──── */}
        {/* Mostra mensagem se não houver nenhum agendamento */}
        {appointments.length === 0 && (
          <View style={styles.emptyState}>
            {/* Emoji grande como ilustração */}
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Nenhum agendamento</Text>
            <Text style={styles.emptySubtitle}>
              Você ainda não agendou nenhum serviço.{'\n'}
              Que tal agendar um agora? 💅
            </Text>
          </View>
        )}

        {/* ──── Seção: Próximos Agendamentos ──── */}
        {upcoming.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📌 Próximos</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{upcoming.length}</Text>
              </View>
            </View>

            {/* Renderiza um AppointmentCard para cada agendamento */}
            {upcoming.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </>
        )}

        {/* ──── Seção: Concluídos ──── */}
        {completed.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✅ Concluídos</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{completed.length}</Text>
              </View>
            </View>

            {completed.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </>
        )}

        {/* Espaço no final */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

/**
 * Estilos da AppointmentsScreen
 *
 * Estado vazio centralizado com emoji, título e subtítulo.
 * Seções com badge de contagem ao lado do título.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  // ──── Estado vazio (sem agendamentos) ────
  emptyState: {
    alignItems: 'center',                        // Centraliza tudo
    justifyContent: 'center',
    paddingVertical: 80,                         // Espaço vertical generoso
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,                                // Emoji grande como ilustração
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,                                // Título do estado vazio
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,                                // Subtítulo explicativo
    color: Colors.textSecondary,
    textAlign: 'center',                         // Centraliza o texto
    lineHeight: 22,
  },
  // ──── Seções ────
  section: {
    flexDirection: 'row',                        // Título e badge lado a lado
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 8,                              // Espaço entre título e badge
  },
  countBadge: {
    backgroundColor: Colors.primary,             // Rosa principal
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,                            // Pill shape
  },
  countText: {
    color: Colors.textOnPrimary,                 // Branco
    fontSize: 12,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 30,
  },
});
