import * as React from 'react'
import { connect } from 'react-redux'
import styles from './styles.styl'
import { ComponentPropsType, StateProps } from './types'
import { MenuItem } from './menu-item'
import { ApplicationStore } from 'root/store/application.store'
import { appRoutes } from 'root/appRoutes'
import { SiteLogo } from 'components/common/SiteLogo'

class NavbarComponent extends React.Component<ComponentPropsType> {
  render(): React.ReactNode {
    return (
      <>
        <header className={styles.siteHeader} id='site-header'>
          <a className='logo site-logo' id='site-logo' href='/'>
            <SiteLogo />
          </a>
          <nav className='navigation navbar navbar-expand-lg' role='navigation' id='site-nav'>
            <ul className='menu navbar-nav'>
              <li className='menu-item nav-item'>
                <a className='nav-link' href='./'>
                  Лента
                </a>
              </li>
              <MenuItem link={appRoutes.login()}>Вход</MenuItem>
              <MenuItem link={appRoutes.register()}>Регистрация</MenuItem>
            </ul>
          </nav>
        </header>
      </>
    )
  }
}

const mapStateToProps = (state: ApplicationStore): StateProps => ({
  pageTitle: state.page.info.title
})

export const Navbar = connect(mapStateToProps)(NavbarComponent)
