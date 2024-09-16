'use client'

import { Grid2, Typography } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { InfiniteScroll } from '@/components/InfiniteScroll'
import { ProductsStatus } from '@/lib/features/products'
import { useAppSelector } from '@/lib/hooks'
import {
  useLazyGetProductsByCategoryQuery,
  useLazyGetProductsQuery,
  useLazySearchProductsQuery,
} from '@/lib/services/productsApi'
import { Product } from './Product'

export const ProductGrid = () => {
  const { status, search, category, data: products } = useAppSelector((store) => store.products)
  const canLoadMore = status === ProductsStatus.Idle

  const [getAllProducts] = useLazyGetProductsQuery()
  const [searchProducts] = useLazySearchProductsQuery()
  const [getProductsByCategory] = useLazyGetProductsByCategoryQuery()

  const loadMore = useCallback(() => {
    if (search) {
      return searchProducts({ search, limit: 20, skip: products.length })
    }
    if (category) {
      return getProductsByCategory({ category, limit: 20, skip: products.length })
    }
    return getAllProducts({ limit: 20, skip: products.length })
  }, [category, getAllProducts, getProductsByCategory, products.length, search, searchProducts])

  useEffect(() => {
    // Trigger first load when search or category changes.
    if (canLoadMore && products.length === 0) {
      loadMore()
    }
  }, [canLoadMore, loadMore, products.length])

  if (status === ProductsStatus.Failed) {
    return <Typography align="center">Failed to load products.</Typography>
  }
  return (
    <InfiniteScroll action={() => loadMore()} disable={!canLoadMore} offset={-300}>
      <Grid2 spacing={2} container sx={{ minHeight: 300 }} data-testid="ProductGrid">
        {products.map((product) => (
          <Grid2 size={3} key={product.id} data-testid={`ProductGrid:Product:${product.id}`}>
            <Product product={product} />
          </Grid2>
        ))}
      </Grid2>
    </InfiniteScroll>
  )
}
