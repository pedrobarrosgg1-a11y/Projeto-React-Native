/**
 * Lista horizontal de categorias (filtro / seleção).
 *
 * Pode funcionar de dois modos:
 * - Controlado: pai passa `selected` + `onChange` (tela index e add).
 * - Não controlado: mantém estado interno com useState (se onChange não for passado).
 */

import { useState } from "react";
import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

type CategoriesProps = {
  selected?: string;
  onChange?: (name: string) => void;
};

export function Categories({ selected = "", onChange }: CategoriesProps = {}) {
  // Estado interno: primeira categoria selecionada por padrão
  const [internalSelected, setInternalSelected] = useState(categories[0].name);

  // Se o pai passou onChange, o componente é "controlado" pelo pai
  const controlled = onChange != null;
  const selectedName = controlled ? selected : internalSelected;
  const setSelectedName = controlled ? onChange : setInternalSelected;

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          icon={item.icon}
          isSelected={selectedName === item.name}
          onPress={() => setSelectedName(item.name)}
        />
      )}
      horizontal // rolagem lateral
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  );
}
