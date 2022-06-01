import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Loader } from 'components/Loader'
import { useAuth } from 'root/hooks/store'
import { logout } from 'root/store/user/user.actions'

export const LogoutPage: React.FC = () => {
  const authorized = useAuth()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(logout.request())
  }, [authorized])

  return <Loader />
}
