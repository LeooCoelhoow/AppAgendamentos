/**
 * ============================================================
 * components/DateSelector.tsx — Seletor Horizontal de Datas
 * ============================================================
 *
 * Componente que exibe os próximos 14 dias em um ScrollView
 * horizontal, permitindo ao usuário selecionar uma data
 * para o agendamento.
 *
 * Design:
 * - ScrollView horizontal rolável
 * - Cada dia mostra o dia da semana (abreviado) + número
 * - Dia selecionado: fundo rosa (primary) com texto branco
 * - Dia normal: fundo accent com texto escuro
 * - Animação de escala sutil no item selecionado
 *
 * Props:
 * - selectedDate: string — data selecionada ("YYYY-MM-DD")
 * - onSelectDate: (date: string) => void — callback de seleção
 * ============================================================
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';

/** Tipagem das props do DateSelector */
interface DateSelectorProps {
  /** Data atualmente selecionada no formato "YYYY-MM-DD" */
  selectedDate: string;
  /** Função chamada quando o usuário seleciona uma data */
  onSelectDate: (date: string) => void;
}

/**
 * Nomes abreviados dos dias da semana em português
 * Índice 0 = Domingo, 6 = Sábado
 */
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/**
 * Gera um array com os próximos N dias a partir de hoje
 *
 * @param count - Quantidade de dias a gerar (padrão: 14)
 * @returns Array de objetos com dateStr, dayOfWeek e dayNumber
 */
function getNextDays(count: number = 14) {
  const days = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    // Cria uma nova data para cada dia
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Formata a data como "YYYY-MM-DD" para uso interno
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    days.push({
      dateStr: `${year}-${month}-${day}`,                 // Ex: "2026-04-15"
      dayOfWeek: DIAS_SEMANA[date.getDay()],               // Ex: "Ter"
      dayNumber: date.getDate(),                            // Ex: 15
    });
  }

  return days;
}

export default function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
  /** Gera os próximos 14 dias uma vez na renderização */
  const days = getNextDays(14);

  return (
    <View style={styles.container}>
      {/* Label da seção */}
      <Text style={styles.label}>📅 Selecione a data</Text>

      {/* ScrollView horizontal com os dias */}
      <ScrollView
        horizontal                              // Rola na horizontal
        showsHorizontalScrollIndicator={false}  // Esconde a barra de scroll
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((day) => {
          /** Verifica se este dia é o selecionado */
          const isSelected = day.dateStr === selectedDate;

          return (
            <TouchableOpacity
              key={day.dateStr}
              style={[
                styles.dayItem,
                // Se selecionado, aplica o estilo com fundo rosa
                isSelected && styles.dayItemSelected,
              ]}
              onPress={() => onSelectDate(day.dateStr)}
              activeOpacity={0.7}
            >
              {/* Dia da semana (ex: "Ter") */}
              <Text
                style={[
                  styles.dayOfWeek,
                  isSelected && styles.dayOfWeekSelected,
                ]}
              >
                {day.dayOfWeek}
              </Text>

              {/* Número do dia (ex: 15) */}
              <Text
                style={[
                  styles.dayNumber,
                  isSelected && styles.dayNumberSelected,
                ]}
              >
                {day.dayNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

/**
 * Estilos do DateSelector
 *
 * Cada "dayItem" é um botão retangular vertical que mostra
 * o dia da semana e o número. O item selecionado muda de
 * fundo para rosa com texto branco.
 */
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,                          // Espaço abaixo do componente
  },
  label: {
    fontSize: 16,                              // Tamanho do label
    fontWeight: '600',                         // Semi-bold
    color: Colors.textPrimary,                 // Texto escuro
    marginBottom: 12,                          // Espaço entre label e scroll
    marginHorizontal: 20,                      // Alinhado com o padding da tela
  },
  scrollContent: {
    paddingHorizontal: 16,                     // Padding lateral do scroll
    gap: 10,                                   // Espaço entre itens (RN 0.71+)
  },
  dayItem: {
    width: 58,                                 // Largura fixa de cada item
    height: 76,                                // Altura fixa
    borderRadius: 16,                          // Bordas arredondadas
    backgroundColor: Colors.accent,            // Fundo rosa pastel (não selecionado)
    alignItems: 'center',                      // Centraliza conteúdo
    justifyContent: 'center',                  // Centraliza verticalmente
  },
  dayItemSelected: {
    backgroundColor: Colors.primary,           // Fundo rosa principal (selecionado)
    // Sombra para dar profundidade ao item selecionado
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  dayOfWeek: {
    fontSize: 12,                              // Fonte pequena para o dia da semana
    fontWeight: '500',                         // Medium
    color: Colors.textSecondary,               // Cinza (não selecionado)
    marginBottom: 4,                           // Espaço entre dia da semana e número
  },
  dayOfWeekSelected: {
    color: Colors.textOnPrimary,               // Branco (selecionado)
  },
  dayNumber: {
    fontSize: 20,                              // Número grande
    fontWeight: '700',                         // Bold
    color: Colors.textPrimary,                 // Texto escuro (não selecionado)
  },
  dayNumberSelected: {
    color: Colors.textOnPrimary,               // Branco (selecionado)
  },
});
