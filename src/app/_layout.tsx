/**
 * Layout raiz da aplicação (Expo Router).
 *
 * O arquivo `_layout.tsx` dentro de `src/app` define a estrutura de navegação.
 * Aqui usamos `Stack` para empilhar telas (index → add) sem header nativo.
 */

import { Stack } from "expo-router";

import { colors } from "@/styles/colors";

/** Componente de layout exportado como padrão — o Expo Router o monta automaticamente. */
export default function Layout() {
  // Cor de fundo aplicada a todas as telas do stack
  const backgroundColor = colors.gray[950];

  return (
    <Stack
      screenOptions={{
        // Esconde o cabeçalho padrão do React Navigation (usamos header customizado em cada tela)
        headerShown: false,
        contentStyle: {
          backgroundColor,
        },
      }}
    />
  );
}
