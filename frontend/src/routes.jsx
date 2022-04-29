import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './components/pages/LinksPage'
import { DetailPage } from './components/pages/DetailPage'
import { AuthPage } from './components/pages/auth/AuthPage'
import { RegPage } from './components/pages/register/RegPage'
import { CrtrPage } from './components/pages/CrtrPage'
import { ProfilePage } from './components/pages/ProfilePage'
import { ScenesEditor } from './components/pages/create-movie/scenes-editor/ScenesEditor.tsx'
import { appRoutes } from './appRoutes'

export const useRoutes = isAuthenticated => {
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
      <Route path={appRoutes.login()} exact>
        <AuthPage />
      </Route>
      <Route path='/scenes-editor' exact>
        <ScenesEditor />
      </Route>
      <Route path={appRoutes.register()} exact>
        <RegPage />
      </Route>
      <Redirect to={appRoutes.login()}></Redirect>
    </Switch>
  )
}
