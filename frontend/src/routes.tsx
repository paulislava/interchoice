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
import { MoviePlayer } from 'components/pages/movie/player/MoviePlayer'
import { PromoPage } from 'components/pages/promo/PromoPage'
import { UserProjectsPage } from 'components/pages/user-projects/UserProjects'

export const useRoutes = (): React.ReactNode => {
  return (
    <Switch>
      <Route path={appRoutes.promo()} exact component={PromoPage} />
      <Route path={appRoutes.login()} exact component={AuthPage} />
      <Route path={appRoutes.register()} component={RegPage} exact />
      <Route path={appRoutes.movie()} component={MoviePlayer} exact />

      <AuthorizedRoute path={appRoutes.scenesEditor()} component={ScenesEditor} exact />
      <AuthorizedRoute path={appRoutes.createMovie()} component={CreateMoviePage} exact />
      <AuthorizedRoute path={appRoutes.userProjects()} component={UserProjectsPage} exact />

      <Redirect to={appRoutes.createMovie()} />
    </Switch>
  )
}
