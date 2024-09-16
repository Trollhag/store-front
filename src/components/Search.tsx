import { debounce, TextField } from '@mui/material'
import { useMemo } from 'react'
import { setSearch } from '@/lib/features/products'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

export const Search = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.products.search)

  const onSearchChange = useMemo(() => debounce((value: string) => dispatch(setSearch(value)), 500), [dispatch])

  return (
    <TextField
      label="Search"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      fullWidth
      size="medium"
      slotProps={{
        htmlInput: { 'data-testid': 'Search' },
      }}
    />
  )
}
