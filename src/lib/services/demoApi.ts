import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const demoApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  reducerPath: 'demoApi',
  endpoints: () => ({}),
})
