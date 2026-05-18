/**
 * Paleta de cores centralizada do app.
 *
 * Manter cores aqui evita valores "hardcoded" espalhados e facilita
 * manter consistência visual (tema escuro com destaque em verde/teal).
 */

export const colors = {
  // Escala de cinzas (do mais claro ao mais escuro)
  gray: {
    100: "#F4F4F5", // texto principal claro
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA", // textos secundários, placeholders
    500: "#71717A",
    600: "#52525B", // bordas/divisores
    800: "#27272A", // bordas de inputs
    900: "#18181B", // fundos de cards/modal
    950: "#09090B", // fundo geral da aplicação
  },

  // Cor de destaque (botões, ícones selecionados, ações primárias)
  green: {
    300: "#2DD4BF",
    900: "#042F2E", // texto escuro sobre botão verde
  },
};
