'use client'

import { Container, Box } from '@mui/material'
import React from 'react'
import { CategorySelect } from '@/components/CategorySelect'
import { ProductGrid } from '@/components/ProductGrid'
import { Search } from '@/components/Search'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Search />
      </Box>
      <Box my={4}>
        <CategorySelect />
      </Box>
      <ProductGrid />
    </Container>
  )
}
