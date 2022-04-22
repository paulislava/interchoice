import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
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
                        <a href='/' onClick={logoutHandler}>
                            Выйти
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
