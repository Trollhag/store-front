import type { Product } from '@/lib/services/productsApi'
import { padRight } from './StringUtils'

export const formatPrice = (price: number): string => {
  const [a, b] = (Math.floor(price * 100) / 100).toString().split('.')
  return [a, padRight(b, '0', 2)].join('.')
}

export const useProductPrice = (product: Product) => {
  const discountProcentile = (product.discountPercentage ?? 0) / 100
  const discount = product.price * discountProcentile
  const display = product.price - discount

  return {
    isDiscounted: product.price !== display,
    original: formatPrice(product.price),
    display: formatPrice(display),
    discount: formatPrice(discount),
  }
}
