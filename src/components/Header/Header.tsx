import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'


const Header: React.FC = () => {
    const [open, setOpen] = useState(false)


    const toggle = (e?: React.MouseEvent) => {
        if (e) e.preventDefault()
        setOpen(prev => !prev)
    }


    const closeMenu = () => setOpen(false)


    return (
        <header className="header header-main">
            <a href="#" className="burger" onClick={toggle}>
                <span />
            </a>


            <div className={`header__top ${open ? 'header__top--burger-open' : ''}`}>
                <div className="container">
                    <div className="header__top-inner">
                        <Link className="header__logo logo" to="/" onClick={closeMenu}>
                            <img src={logo} alt="logo" />
                        </Link>


                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/characters" onClick={closeMenu}>Characters</Link>
                                </li>
                                <li className="header__nav-item">
                                    <span className="header__nav-link disabled">Houses</span>
                                </li>
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/filmography" onClick={closeMenu}>Filmography</Link>
                                </li>
                                <li className="header__nav-item">
                                    <span className="header__nav-link disabled">About us</span>
                                </li>
                            </ul>
                        </nav>


                    </div>
                </div>
            </div>


        </header>
    )
}


export default Header