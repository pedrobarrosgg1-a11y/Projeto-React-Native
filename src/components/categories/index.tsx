import { useState } from "react"
import { FlatList } from "react-native"

import { styles } from "./styles"
import { categories } from "@/utils/categories"
import { Category } from "@/components/category"

type CategoriesProps = {
  selected?: string
  onChange?: (id: string) => void
}

export function Categories({ selected = "", onChange }: CategoriesProps = {}) {
  const [internalSelected, setInternalSelected] = useState("1")
  const controlled = onChange != null
  const selectedId = controlled ? selected : internalSelected
  const setSelectedId = controlled ? onChange : setInternalSelected

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          icon={item.icon}
          isSelected={selectedId === item.id}
          onPress={() => setSelectedId(item.id)}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  )
}
