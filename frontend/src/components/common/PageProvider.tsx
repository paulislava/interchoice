import * as React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { pagesInfo } from 'root/pages'
import { setPageInfo } from 'root/store/page/page.actions'

const PageProvider: React.FC = props => {
  const location = useLocation().pathname
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const pageInfo = location in pagesInfo ? pagesInfo[location] : undefined

    if (pageInfo) {
      dispatch(setPageInfo(pageInfo))
    }
  }, [location])

  return <>{props.children}</>
}

export default PageProvider
