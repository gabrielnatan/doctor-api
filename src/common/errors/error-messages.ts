export const ErrorMessages = {
  USER: {
    NOT_FOUND: (id: number | string) => `Usuário com id ${id} não encontrado.`,
    EMAIL_IN_USE: 'Email já está em uso.',
  },
  PATIENT: {
    NOT_FOUND: (id: number | string) => `Paciente com id ${id} não encontrado.`,
  },
  ADDRESS: {
    NOT_FOUND: (id: number | string) => `Endereço com id ${id} não encontrado.`,
  },
  DOCTOR: {
    NOT_FOUND: (id: number | string) => `Doutor com id ${id} não encontrado.`,
  },
};
