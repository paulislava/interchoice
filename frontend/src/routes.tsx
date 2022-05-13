import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './components/pages/LinksPage'
import { DetailPage } from './components/pages/DetailPage'
import { AuthPage } from './components/pages/auth/AuthPage'
import { RegPage } from './components/pages/register/RegPage'
import { ProfilePage } from './components/pages/ProfilePage'
import { ScenesEditor } from './components/pages/movie/scenes-editor/ScenesEditor'
import { appRoutes } from './appRoutes'
import { AuthorizedRoute } from 'components/common/AuthorizedRoute'
import { CreateMoviePage } from 'components/pages/movie/movie-project/CreateMoviePage'

export const useRoutes = (): React.ReactNode => {
  return (
    <Switch>
      <Route path={appRoutes.login()} exact component={AuthPage} />
      <AuthorizedRoute path={appRoutes.scenesEditor()} exact>
        <ScenesEditor />
      </AuthorizedRoute>
      <Route path={appRoutes.register()} component={RegPage} exact />

      <Route path='/profile' exact>
        <ProfilePage />
      </Route>
      <AuthorizedRoute path='/links' exact>
        <LinksPage />
      </AuthorizedRoute>
      <AuthorizedRoute path={appRoutes.create()} component={CreateMoviePage} exact />
      <Route path='/detail/:id' exact>
        <DetailPage />
      </Route>
      <Redirect to={appRoutes.create()} />
    </Switch>
  )
}
