/* eslint-disable @next/next/no-img-element */
import { Box, Chip, Typography } from '@mui/material'
import { useAppSelector } from '@/lib/hooks'
import type { Product as ProductModel } from '@/lib/services/productsApi'

export interface ProductProps {
  product: ProductModel
}

export const Product = ({ product }: ProductProps) => {
  const categories = useAppSelector((state) => state.products.categories)
  return (
    <>
      <Box p={1}>
        {categories?.[product.category] && (
          <Chip label={categories?.[product.category]} data-testid="Product:Category" />
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textDecoration: 'none', color: 'initial' }}>
        <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} data-testid="Product:Image" />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {product.brand && (
            <Typography variant="caption" data-testid="Product:Brand">
              {product.brand}
            </Typography>
          )}
          <Typography variant="subtitle1" fontWeight="500" data-testid="Product:Title">
            {product.title}
          </Typography>
          <Typography variant="body2" sx={{ flexGrow: 1 }} data-testid="Product:Description">
            {product.description}
          </Typography>
          <Typography align="right" fontWeight="500" data-testid="Product:Price">{`$${product.price}`}</Typography>
        </Box>
      </Box>
    </>
  )
}
