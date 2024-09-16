import { MenuItem, TextField } from '@mui/material'
import { setCategory } from '@/lib/features/products'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useGetCategoriesQuery } from '@/lib/services/productsApi'

export const CategorySelect = () => {
  const dispatch = useAppDispatch()
  const { category } = useAppSelector((state) => state.products)
  const { data: categories } = useGetCategoriesQuery()
  return (
    <TextField
      label="Category"
      value={category}
      onChange={(e) => dispatch(setCategory(e.target.value))}
      select
      sx={{ minWidth: 150 }}
      data-testid="CategorySelect"
    >
      <MenuItem value={undefined} data-testid="CategorySelect:Option:All">
        -- All --
      </MenuItem>
      {categories?.map(({ slug, name }) => (
        <MenuItem key={slug} value={slug} data-testid={`CategorySelect:Option:${slug}`}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  )
}
