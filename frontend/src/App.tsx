import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RawIntlProvider } from 'react-intl'
import { generateIntl } from './helpers/intl'
import { messages } from './translations/ru'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'

function App(): JSX.Element {
    const { token, login, logout, userId, ready } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    const intlValue = generateIntl({ locale: 'ru-RU', messages })

    return (
        <RawIntlProvider value={intlValue}>
            <AuthContext.Provider
                value={{
                    token,
                    login,
                    logout,
                    userId,
                    isAuthenticated
                }}
            >
                <Router>
                    {isAuthenticated && <Navbar />}
                    {routes}
                </Router>
            </AuthContext.Provider>
        </RawIntlProvider>
    )
}

export default App
