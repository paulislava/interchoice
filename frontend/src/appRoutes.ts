export const appRoutes = {
  root: (): string => '/',
  login: (): string => '/login',
  register: (): string => '/register',
  movie: (movieId: string = ':movieId'): string => `/movie/${movieId}`,
  scenesEditor: (movieId: string = ':movieId'): string => `${appRoutes.movie(movieId)}/scenes`,
  create: (): string => '/movie/create'
}
