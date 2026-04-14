/**
 * ============================================================
 * components/ServiceCard.tsx — Card de Serviço de Beleza
 * ============================================================
 *
 * Componente que exibe as informações de um serviço de beleza
 * em formato de card. Usado na tela Home para listar todos
 * os serviços disponíveis.
 *
 * Design:
 * - Card com fundo branco e sombra rosa sutil
 * - Emoji grande à esquerda como ícone visual
 * - Nome, descrição resumida, preço e duração
 * - Borda esquerda colorida em rosa para destaque
 * - Pressable com feedback visual (opacidade)
 *
 * Props:
 * - service: Service — dados do serviço a exibir
 * - onPress: () => void — callback ao pressionar o card
 * ============================================================
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { Service } from '../types';

/** Tipagem das props do ServiceCard */
interface ServiceCardProps {
  /** Dados do serviço a ser exibido */
  service: Service;
  /** Função chamada ao pressionar o card */
  onPress: () => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    /* TouchableOpacity dá feedback visual ao tocar no card */
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}   // Opacidade ao pressionar (feedback sutil)
    >
      {/* Barra lateral rosa — elemento decorativo de destaque */}
      <View style={styles.accentBar} />

      {/* Emoji do serviço — grande e centralizado */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{service.icon}</Text>
      </View>

      {/* Informações textuais do serviço */}
      <View style={styles.infoContainer}>
        {/* Nome do serviço */}
        <Text style={styles.name} numberOfLines={1}>
          {service.name}
        </Text>

        {/* Descrição curta — limitada a 2 linhas para não quebrar o layout */}
        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>

        {/* Linha com preço e duração lado a lado */}
        <View style={styles.detailsRow}>
          {/* Preço formatado em reais */}
          <Text style={styles.price}>
            R$ {service.price.toFixed(2).replace('.', ',')}
          </Text>

          {/* Separador visual */}
          <Text style={styles.separator}>•</Text>

          {/* Duração em minutos */}
          <Text style={styles.duration}>{service.duration} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Estilos do ServiceCard
 *
 * Layout em flexDirection: 'row' para posicionar
 * a barra lateral, o ícone e as informações lado a lado.
 * Sombra rosa sutil para efeito de profundidade.
 */
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',                     // Layout horizontal
    alignItems: 'center',                     // Centraliza verticalmente
    backgroundColor: Colors.surface,          // Fundo branco do card
    borderRadius: 16,                         // Bordas arredondadas
    marginHorizontal: 20,                     // Margem lateral
    marginBottom: 12,                         // Espaço entre cards
    padding: 16,                              // Padding interno
    // Sombra (iOS)
    shadowColor: Colors.shadow,               // Sombra rosa
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Sombra (Android)
    elevation: 3,
    overflow: 'hidden',                       // Esconde a barra lateral que transborda
  },
  accentBar: {
    position: 'absolute',                     // Posiciona sobre o card
    left: 0,                                  // Cola na borda esquerda
    top: 0,
    bottom: 0,
    width: 4,                                 // Largura fina da barra
    backgroundColor: Colors.primary,          // Rosa principal
    borderTopLeftRadius: 16,                  // Acompanha o border radius do card
    borderBottomLeftRadius: 16,
  },
  iconContainer: {
    width: 52,                                // Tamanho fixo do container do ícone
    height: 52,
    borderRadius: 14,                         // Bordas arredondadas
    backgroundColor: Colors.accent,           // Fundo rosa pastel
    alignItems: 'center',                     // Centraliza o emoji
    justifyContent: 'center',
    marginRight: 14,                          // Espaço entre ícone e texto
  },
  icon: {
    fontSize: 24,                             // Tamanho do emoji
  },
  infoContainer: {
    flex: 1,                                  // Ocupa o espaço restante
  },
  name: {
    fontSize: 16,                             // Tamanho do nome do serviço
    fontWeight: '700',                        // Negrito
    color: Colors.textPrimary,                // Texto escuro
    marginBottom: 3,                          // Espaço abaixo do nome
  },
  description: {
    fontSize: 12,                             // Fonte menor para descrição
    color: Colors.textSecondary,              // Cinza
    lineHeight: 17,                           // Espaçamento entre linhas
    marginBottom: 6,                          // Espaço abaixo da descrição
  },
  detailsRow: {
    flexDirection: 'row',                     // Preço e duração lado a lado
    alignItems: 'center',
  },
  price: {
    fontSize: 15,                             // Destaque para o preço
    fontWeight: '700',                        // Negrito
    color: Colors.primary,                    // Rosa principal — chama atenção
  },
  separator: {
    marginHorizontal: 6,                      // Espaço ao redor do ponto
    color: Colors.textSecondary,              // Cinza
    fontSize: 10,
  },
  duration: {
    fontSize: 13,                             // Tamanho menor que o preço
    color: Colors.textSecondary,              // Cinza
  },
});
