import * as React from 'react'
import { connect } from 'react-redux'
import { setPageInfo } from './page.actions'
import { PageInfo } from './page.store'
import { PageInfoProps } from 'root/store/page/page.types'

const withPageInfo = (Component: React.ComponentType<PageInfoProps>): React.ComponentType => {
  return connect(null, dispatch => ({
    setPageInfo(info: PageInfo) {
      dispatch(setPageInfo(info))
    }
  }))(
    class PageInfoContainer extends React.Component<PageInfoProps> {
      render(): React.ReactNode {
        return <Component setPageInfo={this.props.setPageInfo} />
      }
    }
  )
}

export default withPageInfo
