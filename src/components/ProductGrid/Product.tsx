/* eslint-disable @next/next/no-img-element */
import { Box, Card, Chip, Typography } from '@mui/material'
import { useAppSelector } from '@/lib/hooks'
import type { Product as ProductModel } from '@/lib/services/productsApi'
import { useProductPrice } from '@/utils/ProductUtils'

export interface ProductProps {
  product: ProductModel
}

export const Product = ({ product }: ProductProps) => {
  const categories = useAppSelector((state) => state.products.categories)
  const price = useProductPrice(product)

  return (
    <Card
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        textDecoration: 'none',
        color: 'initial',
      }}
    >
      <Box p={2} pb={1}>
        {categories?.[product.category] && (
          <Chip label={categories?.[product.category]} data-testid="Product:Category" />
        )}
      </Box>
      <Box sx={{ position: 'relative' }}>
        {product.discountPercentage && (
          <Chip
            label={`-${product.discountPercentage}%`}
            color="error"
            sx={{ position: 'absolute', top: 2, right: 2 }}
          />
        )}
        <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} data-testid="Product:Image" />
      </Box>
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="caption" data-testid="Product:Brand">
          {product.brand || ' '}
        </Typography>
        <Typography variant="subtitle1" fontWeight="500" data-testid="Product:Title">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ flexGrow: 1 }} data-testid="Product:Description">
          {product.description}
        </Typography>
        <Typography
          variant="overline"
          align="right"
          fontWeight="500"
          data-testid="Product:OriginalPrice"
          sx={{ textDecoration: 'line-through' }}
        >
          {price.isDiscounted && `$${price.original}`}
        </Typography>
        <Typography align="right" fontWeight="500" data-testid="Product:Price">{`$${price.display}`}</Typography>
      </Box>
    </Card>
  )
}
