/**
 * ============================================================
 * components/Header.tsx — Componente de Cabeçalho
 * ============================================================
 *
 * Header reutilizável que aparece no topo de cada tela.
 * Exibe um título principal e um subtítulo opcional.
 *
 * Design:
 * - Fundo branco (surface) com borda inferior rosa sutil
 * - Padding superior para respeitar a safe area
 * - Título em rosa escuro (primaryDark) para destaque
 * - Subtítulo em cinza (textSecondary) para informações extras
 *
 * Props:
 * - title: string — Texto principal do header
 * - subtitle?: string — Texto secundário (opcional)
 * ============================================================
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

/** Tipagem das props do Header */
interface HeaderProps {
  /** Título principal exibido no header */
  title: string;
  /** Subtítulo opcional abaixo do título */
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Título principal do header */}
      <Text style={styles.title}>{title}</Text>

      {/* Subtítulo — só renderiza se foi passado via props */}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

/**
 * Estilos do Header
 *
 * O paddingTop generoso acomoda a status bar do dispositivo.
 * A borda inferior rosa sutil separa visualmente o header do conteúdo.
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,        // Fundo branco
    paddingTop: 50,                          // Espaço para a status bar
    paddingBottom: 16,                       // Espaço inferior interno
    paddingHorizontal: 24,                   // Padding lateral
    borderBottomWidth: 1,                    // Linha divisória
    borderBottomColor: Colors.border,        // Cor rosa sutil da linha
  },
  title: {
    fontSize: 26,                            // Tamanho grande para destaque
    fontWeight: '700',                       // Negrito (bold)
    color: Colors.primaryDark,               // Rosa escuro — identidade da marca
    letterSpacing: 0.3,                       // Leve espaçamento entre letras
  },
  subtitle: {
    fontSize: 14,                            // Tamanho menor que o título
    color: Colors.textSecondary,             // Cinza para informação auxiliar
    marginTop: 4,                            // Pequeno espaço acima
    letterSpacing: 0.2,                       // Espaçamento sutil
  },
});
