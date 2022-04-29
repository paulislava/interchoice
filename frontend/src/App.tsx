import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RawIntlProvider } from 'react-intl'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { generateIntl } from './helpers/intl'
import messages from './translations/ru'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import 'react-toastify/dist/ReactToastify.css'
import { ApplicationStore, createApplicationStore } from './store/application.store'

function App(): JSX.Element {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  const store: Store<ApplicationStore> = createApplicationStore()

  const intlValue = generateIntl({ locale: 'ru-RU', messages })

  return (
    <RawIntlProvider value={intlValue}>
      <Provider store={store}>
        <AuthContext.Provider
          value={{
            token,
            login,
            logout,
            userId,
            isAuthenticated
          }}
        >
          <ToastContainer />
          <Router>
            <Navbar />
            {routes}
          </Router>
        </AuthContext.Provider>
      </Provider>
    </RawIntlProvider>
  )
}

export default App
