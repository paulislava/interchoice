import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ComponentPropsType, StateProps } from './types'
import { ApplicationStore } from 'root/store/application.store'

class NavbarComponent extends React.Component<ComponentPropsType> {
  render(): React.ReactNode {
    return (
      <>
        <nav>
          <div className='nav-wrapper' style={{ padding: '0 2rem', backgroundColor: '#945d82' }}>
            <span className='brand-logo'>iCinema</span>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              <li>
                <NavLink to='/profile'>Профиль</NavLink>
              </li>
              <li>
                <NavLink to='/create'>Создать фильм</NavLink>
              </li>
              <li>
                <NavLink to='/links'>Мои фильмы</NavLink>
              </li>
              <li>
                <a href='/'>Выйти</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='pageTitle' id='pageTitle'>
          {this.props.pageTitle}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: ApplicationStore): StateProps => ({
  pageTitle: state.page.info.title
})

export const Navbar = connect(mapStateToProps)(NavbarComponent)
