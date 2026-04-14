/**
 * ============================================================
 * context/AppointmentsContext.tsx — Contexto de Agendamentos
 * ============================================================
 *
 * Context API para gerenciar o estado global de agendamentos.
 * Permite que as telas compartilhem os agendamentos marcados
 * sem precisar passar props manualmente entre elas.
 *
 * Funcionalidades:
 * - addAppointment: Adiciona um novo agendamento à lista
 * - appointments: Lista de todos os agendamentos marcados
 *
 * Uso:
 *   // No componente que precisa acessar os agendamentos:
 *   const { appointments, addAppointment } = useAppointments();
 *
 * O Provider deve envolver toda a árvore de componentes
 * no App.tsx para que todas as telas tenham acesso.
 * ============================================================
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment } from '../types';

/**
 * Tipagem do contexto
 *
 * Define os dados e funções disponíveis para os consumidores
 * do contexto de agendamentos.
 */
interface AppointmentsContextType {
  /** Lista de todos os agendamentos marcados pelo usuário */
  appointments: Appointment[];

  /** Adiciona um novo agendamento à lista */
  addAppointment: (appointment: Appointment) => void;
}

/**
 * Criação do contexto com valor inicial undefined
 *
 * O undefined é usado como fallback — se algum componente
 * tentar usar o contexto sem estar dentro do Provider,
 * o hook useAppointments() vai lançar um erro explicativo.
 */
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

/**
 * Tipagem das props do Provider
 * Aceita children (componentes filhos que terão acesso ao contexto)
 */
interface AppointmentsProviderProps {
  children: ReactNode;
}

/**
 * AppointmentsProvider — Componente Provider do Contexto
 *
 * Envolve a árvore de componentes e fornece o estado de
 * agendamentos + a função para adicionar novos agendamentos.
 *
 * O useState armazena o array de Appointment localmente.
 * Em uma versão futura, poderia ser substituído por
 * AsyncStorage ou uma API backend.
 */
export function AppointmentsProvider({ children }: AppointmentsProviderProps) {
  /** Estado que armazena todos os agendamentos */
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  /**
   * Adiciona um novo agendamento ao estado
   *
   * Usa o spread operator para manter os agendamentos existentes
   * e adicionar o novo no final do array.
   *
   * @param appointment - Novo agendamento a ser adicionado
   */
  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    /* Fornece o valor do contexto para todos os filhos */
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

/**
 * useAppointments — Hook customizado para consumir o contexto
 *
 * Facilita o uso do contexto nos componentes. Em vez de
 * importar o Context e usar useContext diretamente, basta
 * chamar useAppointments().
 *
 * Lança um erro se usado fora do AppointmentsProvider,
 * ajudando a identificar bugs de configuração.
 *
 * @returns O contexto com appointments e addAppointment
 * @throws Error se usado fora do Provider
 */
export function useAppointments(): AppointmentsContextType {
  const context = useContext(AppointmentsContext);

  // Proteção: garante que o hook só é usado dentro do Provider
  if (!context) {
    throw new Error(
      'useAppointments deve ser usado dentro de um <AppointmentsProvider>. ' +
      'Verifique se o Provider está envolvendo a árvore de componentes no App.tsx.'
    );
  }

  return context;
}
