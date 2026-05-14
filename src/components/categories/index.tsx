import { useState } from "react"
import { FlatList } from "react-native"

import { styles } from "./styles"
import { categories } from "@/utils/categories"
import { Category } from "@/components/category"

type CategoriesProps = {
  selected?: string
  onChange?: (name: string) => void
}

export function Categories({ selected = "", onChange }: CategoriesProps = {}) {
  const [internalSelected, setInternalSelected] = useState(categories[0].name)
  const controlled = onChange != null
  const selectedName = controlled ? selected : internalSelected
  const setSelectedName = controlled ? onChange : setInternalSelected

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
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  )
}
