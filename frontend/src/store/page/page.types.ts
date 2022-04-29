import { PageInfo } from './page.store'

export interface PageInfoProps {
  setPageInfo(info: PageInfo): void
}

export interface PageInfoStateProps {
  pageInfo: PageInfo
}
