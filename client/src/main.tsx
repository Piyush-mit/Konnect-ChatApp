import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./components/Theme-provider.tsx"
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Toaster/>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
)
