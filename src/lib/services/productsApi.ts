import qs from 'qs'
import { appendProducts, ProductsStatus, setCategories, setStatus } from '@/lib/features/products'
import { demoApi } from './demoApi'

export interface Category {
  slug: string
  name: string
}

export interface Product {
  id: number
  brand: string
  title: string
  description: string
  thumbnail: string
  price: number
  category: string
}

export interface ProductsApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductsApiQuery {
  limit?: number
  skip?: number
}

const getQuery = (path: string, query?: object) => {
  return `${['products', path].filter(Boolean).join('/')}?${qs.stringify(query)}`
}

export const productsApi = demoApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: (_: void) => getQuery('categories'),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCategories(data))
        } catch {
          dispatch(setStatus(ProductsStatus.Failed))
        }
      },
    }),
    getProduct: build.query<Product, number>({
      query: (id) => getQuery(`${id}`),
    }),
    getProducts: build.query<ProductsApiResponse, ProductsApiQuery | void>({
      query: ({ skip = 0, limit = 20 } = {}) => getQuery('', { skip, limit }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setStatus(ProductsStatus.Loading))
          const { data } = await queryFulfilled
          dispatch(appendProducts(data))
        } catch {
          dispatch(setStatus(ProductsStatus.Failed))
        }
      },
    }),
    searchProducts: build.query<ProductsApiResponse, { search: string } & ProductsApiQuery>({
      query: ({ search, skip = 0, limit = 20 }) => getQuery('search', { skip, limit, q: search }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setStatus(ProductsStatus.Loading))
          const { data } = await queryFulfilled
          dispatch(appendProducts(data))
        } catch {
          dispatch(setStatus(ProductsStatus.Failed))
        }
      },
    }),
    getProductsByCategory: build.query<ProductsApiResponse, { category: string } & ProductsApiQuery>({
      query: ({ category, skip = 0, limit = 20 }) =>
        getQuery(`category/${encodeURIComponent(category)}`, { skip, limit }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setStatus(ProductsStatus.Loading))
          const { data } = await queryFulfilled
          dispatch(appendProducts(data))
        } catch {
          dispatch(setStatus(ProductsStatus.Failed))
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useLazySearchProductsQuery,
  useLazyGetProductsByCategoryQuery,
} = productsApi
