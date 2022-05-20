import { appRoutes } from './appRoutes'
import { PageInfo } from './store/page/page.store'

export const pagesInfo: Record<string, PageInfo> = {
  [appRoutes.login()]: {
    title: 'Вход'
  },
  [appRoutes.register()]: {
    title: 'Регистрация'
  },
  [appRoutes.scenesEditor()]: {
    title: 'Редактор сцен'
  },
  [appRoutes.movie()]: {
    title: 'Просмотр фильма'
  },
  [appRoutes.create()]: {
    title: 'Создание фильма'
  }
}
