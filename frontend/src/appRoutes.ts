export const appRoutes = {
  root: (): string => '/',
  login: (): string => '/login',
  register: (): string => '/register',
  scenesEditor: (movieId: string = ':movieId'): string => `/movie/${movieId}/scenes`,
  create: (): string => '/movie/create'
}
