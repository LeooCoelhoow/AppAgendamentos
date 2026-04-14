/**
 * ============================================================
 * components/AppointmentCard.tsx — Card de Agendamento Marcado
 * ============================================================
 *
 * Componente que exibe as informações de um agendamento
 * já realizado pelo usuário. Usado na tela "Meus Agendamentos".
 *
 * Design:
 * - Card branco com borda arredondada
 * - Badge de status colorida (pendente, confirmado, concluído, cancelado)
 * - Ícone do serviço, data e horário bem organizados
 * - Sombra sutil para profundidade
 *
 * Props:
 * - appointment: Appointment — dados do agendamento
 * ============================================================
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Appointment } from '../types';

/** Tipagem das props do AppointmentCard */
interface AppointmentCardProps {
  /** Dados do agendamento a ser exibido */
  appointment: Appointment;
}

/**
 * Mapeamento de status para cores e labels
 *
 * Cada status tem uma cor de fundo e texto específica
 * para dar feedback visual claro ao usuário.
 */
const statusConfig: Record<
  Appointment['status'],
  { label: string; bgColor: string; textColor: string }
> = {
  pendente: {
    label: 'Pendente',
    bgColor: '#FFF3CD',      // Amarelo suave
    textColor: '#856404',     // Amarelo escuro
  },
  confirmado: {
    label: 'Confirmado',
    bgColor: '#D4EDDA',      // Verde suave
    textColor: '#155724',     // Verde escuro
  },
  concluido: {
    label: 'Concluído',
    bgColor: '#D1ECF1',      // Azul suave
    textColor: '#0C5460',     // Azul escuro
  },
  cancelado: {
    label: 'Cancelado',
    bgColor: '#F8D7DA',      // Vermelho suave
    textColor: '#721C24',     // Vermelho escuro
  },
};

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  /** Busca a configuração visual do status atual */
  const status = statusConfig[appointment.status];

  /**
   * Formata a data de "YYYY-MM-DD" para "DD/MM/YYYY"
   * Exemplo: "2026-04-15" → "15/04/2026"
   */
  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.card}>
      {/* Linha superior: Ícone + Nome do serviço + Badge de status */}
      <View style={styles.topRow}>
        {/* Container do emoji do serviço */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{appointment.service.icon}</Text>
        </View>

        {/* Nome do serviço — ocupa o espaço restante */}
        <Text style={styles.serviceName} numberOfLines={1}>
          {appointment.service.name}
        </Text>

        {/* Badge de status com cor dinâmica */}
        <View style={[styles.badge, { backgroundColor: status.bgColor }]}>
          <Text style={[styles.badgeText, { color: status.textColor }]}>
            {status.label}
          </Text>
        </View>
      </View>

      {/* Linha divisória rosa sutil */}
      <View style={styles.divider} />

      {/* Linha inferior: Data e Horário */}
      <View style={styles.bottomRow}>
        {/* Data do agendamento */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>📅 Data</Text>
          <Text style={styles.infoValue}>{formatDate(appointment.date)}</Text>
        </View>

        {/* Horário do agendamento */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>🕐 Horário</Text>
          <Text style={styles.infoValue}>{appointment.time}</Text>
        </View>

        {/* Preço do serviço */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>💰 Valor</Text>
          <Text style={styles.infoValue}>
            R$ {appointment.service.price.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Estilos do AppointmentCard
 *
 * Layout vertical com duas seções:
 * 1. Topo: ícone + nome + badge
 * 2. Baixo: data + horário + valor
 * Separados por uma linha divisória rosa.
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,          // Fundo branco
    borderRadius: 16,                         // Bordas arredondadas
    marginHorizontal: 20,                     // Margem lateral
    marginBottom: 12,                         // Espaço entre cards
    padding: 16,                              // Padding interno
    // Sombra (iOS)
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    // Sombra (Android)
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',                     // Ícone, nome e badge em linha
    alignItems: 'center',                     // Centraliza verticalmente
  },
  iconContainer: {
    width: 40,                                // Tamanho do container do emoji
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.accent,           // Fundo rosa pastel
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,                             // Tamanho do emoji
  },
  serviceName: {
    flex: 1,                                  // Ocupa espaço restante
    fontSize: 16,
    fontWeight: '600',                        // Semi-bold
    color: Colors.textPrimary,
  },
  badge: {
    paddingHorizontal: 10,                    // Padding horizontal da badge
    paddingVertical: 4,                       // Padding vertical da badge
    borderRadius: 20,                         // Totalmente arredondada (pill)
  },
  badgeText: {
    fontSize: 11,                             // Texto pequeno na badge
    fontWeight: '700',                        // Bold para legibilidade
  },
  divider: {
    height: 1,                                // Linha fina
    backgroundColor: Colors.border,           // Rosa sutil
    marginVertical: 12,                       // Espaço acima e abaixo
  },
  bottomRow: {
    flexDirection: 'row',                     // Data, horário e valor lado a lado
    justifyContent: 'space-between',          // Espaço igual entre itens
  },
  infoItem: {
    alignItems: 'center',                     // Centraliza o conteúdo
  },
  infoLabel: {
    fontSize: 11,                             // Label pequeno
    color: Colors.textSecondary,              // Cinza
    marginBottom: 3,                          // Espaço entre label e valor
  },
  infoValue: {
    fontSize: 14,                             // Valor um pouco maior
    fontWeight: '600',                        // Semi-bold
    color: Colors.textPrimary,                // Texto escuro
  },
});
