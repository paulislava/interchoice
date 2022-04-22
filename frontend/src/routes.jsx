import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'
import { RegPage } from './pages/register/RegPage'
import { CrtrPage } from './pages/CrtrPage'
import { ProfilePage } from './pages/ProfilePage'
import { ScenesEditor } from './pages/create-movie/scenes-editor/ScenesEditor.tsx'

export const useRoutes = isAuthenticated => {
    isAuthenticated = true
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/profile' exact>
                    <ProfilePage />
                </Route>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CrtrPage />
                </Route>
                <Route path='/detail/:id' exact>
                    <DetailPage />
                </Route>
                <Route path='/scenes-editor' exact>
                    <ScenesEditor />
                </Route>
                <Redirect to='create' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/login' exact>
                <AuthPage />
            </Route>
            <Route path='/register' exact>
                <RegPage />
            </Route>
            <Redirect to='/login'></Redirect>
        </Switch>
    )
}
