/**
 * ============================================================
 * components/PinkButton.tsx — Botão Estilizado Rosa
 * ============================================================
 *
 * Botão reutilizável padrão do app com estilo rosa.
 * Usado para ações principais como "Confirmar Agendamento".
 *
 * Design:
 * - Fundo rosa (primary) sólido
 * - Texto branco, bold, centralizado
 * - Bordas arredondadas (pill shape)
 * - Feedback visual de pressão (opacidade)
 * - Sombra rosa para profundidade
 * - Estado desabilitado com opacidade reduzida
 *
 * Props:
 * - title: string — texto do botão
 * - onPress: () => void — callback ao pressionar
 * - disabled?: boolean — desabilita o botão (opcional)
 * ============================================================
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';

/** Tipagem das props do PinkButton */
interface PinkButtonProps {
  /** Texto exibido dentro do botão */
  title: string;
  /** Função chamada ao pressionar o botão */
  onPress: () => void;
  /** Se true, o botão fica desabilitado (cinza e sem interação) */
  disabled?: boolean;
}

export default function PinkButton({ title, onPress, disabled = false }: PinkButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Aplica estilo de desabilitado se a prop disabled for true
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      activeOpacity={0.8}                     // Feedback visual ao pressionar
      disabled={disabled}                      // Bloqueia interação se desabilitado
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

/**
 * Estilos do PinkButton
 *
 * Botão largo com padding generoso, bordas arredondadas
 * e sombra rosa para dar sensação de elevação.
 */
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,           // Rosa principal
    paddingVertical: 16,                       // Altura generosa
    paddingHorizontal: 32,                     // Largura generosa
    borderRadius: 28,                          // Totalmente arredondado (pill)
    marginHorizontal: 20,                      // Margem lateral
    marginVertical: 10,                        // Margem vertical
    alignItems: 'center',                      // Centraliza o texto
    justifyContent: 'center',
    // Sombra rosa (iOS)
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Sombra (Android)
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,                              // Reduz opacidade quando desabilitado
    // Remove sombra do botão desabilitado
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: Colors.textOnPrimary,               // Texto branco
    fontSize: 16,                              // Tamanho legível
    fontWeight: '700',                         // Bold para destaque
    letterSpacing: 0.5,                        // Leve espaçamento
  },
});
