import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import rootSaga from './application.saga'
import { pageReducer, PageStore } from './page/page.store'
import { userReducer, UserStore } from './user/store'

export interface ApplicationStore {
  user: UserStore
  page: PageStore
}

export function createApplicationStore(): Store<ApplicationStore> {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware()
  const store: Store<ApplicationStore> = createStore(
    combineReducers<ApplicationStore>({
      user: userReducer,
      page: pageReducer
    }),
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}
