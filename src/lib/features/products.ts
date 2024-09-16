import { createAppSlice } from '@/lib/createAppSlice'
import { Category, Product, ProductsApiResponse } from '@/lib/services/productsApi'

export enum ProductsStatus {
  Loading = 'loading',
  Done = 'done',
  Idle = 'idle',
  Failed = 'failed',
}

export interface ProductsState {
  categories?: {
    [key: Category['slug']]: Category['name']
  }
  status: ProductsStatus
  data: Product[]
  search?: string
  category?: string
  total?: number
}

const initialState: ProductsState = {
  status: ProductsStatus.Idle,
  data: [],
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const productsSlice = createAppSlice({
  name: 'products',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    setCategories: create.reducer<Category[]>((state, action) => {
      state.categories = action.payload.reduce((o, c) => ({ ...o, [c.slug]: c.name }), {})
    }),
    appendProducts: create.reducer<ProductsApiResponse>((state, action) => {
      state.data.push(...action.payload.products)
      state.total = action.payload.total
      state.status = state.total > state.data.length ? ProductsStatus.Idle : ProductsStatus.Done
    }),
    setSearch: create.reducer<string | undefined>((state, action) => {
      state.search = action.payload
      state.data = []
      state.total = undefined
      state.status = ProductsStatus.Idle
    }),
    setCategory: create.reducer<string | undefined>((state, action) => {
      state.category = action.payload
      state.data = []
      state.total = undefined
      state.status = ProductsStatus.Idle
    }),
    setStatus: create.reducer<ProductsStatus>((state, action) => {
      state.status = action.payload
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectProducts: ({ data }) => data,
    selectStatus: ({ status }) => status,
  },
})

// Action creators are generated for each case reducer function.
export const { setCategories, appendProducts, setSearch, setCategory, setStatus } = productsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectProducts, selectStatus } = productsSlice.selectors
