/**
 * Dados e utilitários das categorias de links.
 *
 * Cada link salvo pertence a uma categoria (Curso, Projeto, Site, etc.).
 * Este arquivo é a "fonte da verdade" para ícones e nomes exibidos na UI.
 */

import { MaterialIcons } from "@expo/vector-icons";

/** Formato de uma categoria na lista horizontal */
type Category = {
  id: string;
  name: string;
  // Restringe o ícone aos nomes válidos do pacote @expo/vector-icons
  icon: keyof typeof MaterialIcons.glyphMap;
};

/** Lista fixa de categorias disponíveis no app */
export const categories: Category[] = [
  { id: "1", name: "Curso", icon: "code" },
  { id: "2", name: "Projeto", icon: "folder" },
  { id: "3", name: "Site", icon: "language" },
  { id: "4", name: "Artigo", icon: "newspaper" },
  { id: "5", name: "Video", icon: "movie" },
  { id: "6", name: "Documentação", icon: "content-paste" },
];

/**
 * Retorna o nome legível da categoria para exibir na UI.
 *
 * Aceita tanto o `id` antigo (legado no AsyncStorage) quanto o `name` atual,
 * para links salvos em versões anteriores do app continuarem funcionando.
 */
export function getCategoryLabel(stored: string): string {
  const byId = categories.find((c) => c.id === stored);
  if (byId) return byId.name;

  const byName = categories.find((c) => c.name === stored);
  if (byName) return byName.name;

  // Se não encontrar, devolve o valor bruto (fallback)
  return stored;
}

/**
 * Verifica se um link pertence à categoria selecionada na aba.
 *
 * A aba usa o `name` da categoria, mas links antigos podem ter salvo só o `id`.
 * Esta função cobre os dois casos para o filtro da lista funcionar sempre.
 */
export function linkMatchesSelectedCategory(
  linkCategory: string,
  selectedName: string,
): boolean {
  if (linkCategory === selectedName) return true;

  const selected = categories.find((c) => c.name === selectedName);
  return selected != null && linkCategory === selected.id;
}
