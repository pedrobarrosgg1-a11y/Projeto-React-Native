/**
 * Camada de persistência local com AsyncStorage.
 *
 * Todos os links ficam salvos no dispositivo em JSON, sob a chave
 * `Links-storage`. Não há backend — ideal para estudo e protótipo offline.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Chave única usada no AsyncStorage para o array de links */
const LINKS_STORAGE_KEY = "Links-storage";

/** Formato de um link persistido */
export type LinkStorages = {
  id: string;
  name: string;
  url: string;
  category: string; // nome ou id da categoria (ver utils/categories)
};

/**
 * Busca todos os links salvos.
 * @returns Array de links; array vazio se ainda não houver nada salvo.
 */
async function get(): Promise<LinkStorages[]> {
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : [];

  return response;
}

/**
 * Adiciona um novo link ao final da lista persistida.
 * Lê o estado atual, concatena o novo item e grava de volta.
 */
async function save(newLink: LinkStorages) {
  try {
    const storage = await get();
    const updated = JSON.stringify([...storage, newLink]);

    await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated);
  } catch (error) {
    throw error;
  }
}

/**
 * Remove um link pelo `id`.
 * Filtra o array, mantém os demais e persiste o resultado.
 */
async function remove(id: string) {
  try {
    const storage = await get();

    const updated = storage.filter((link) => link.id !== id);

    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

/** API pública do módulo — telas importam apenas este objeto */
export const LinkStorage = { get, save, remove };
