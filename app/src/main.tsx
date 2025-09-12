import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'
import { CustomThemeProvider } from './context/Theme'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CustomThemeProvider>
        <CssBaseline />
        <App />
      </CustomThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)
