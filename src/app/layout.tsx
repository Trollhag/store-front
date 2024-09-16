import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import * as React from 'react'
import theme from '@/theme'
import { StoreProvider } from './StoreProvider'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
