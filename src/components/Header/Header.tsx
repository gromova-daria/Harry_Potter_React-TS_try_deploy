import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation(); // текущий путь

    const toggle = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setOpen(prev => !prev);
    };

    const closeMenu = () => setOpen(false);

    const isActive = (path: string) => location.pathname === path;

    // Функция для скролла к футеру (только для About us)
    const scrollToFooter = () => {
        const footerElement = document.getElementById('contacts');
        if (footerElement) {
            footerElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        closeMenu(); // Закрываем меню после клика
    };

    return (
        <header className="header header-main">
            <a href="#" className="burger" onClick={toggle}><span /></a>

            <div className={`header__top ${open ? 'header__top--burger-open' : ''}`}>
                <div className="container">
                    <div className="header__top-inner">
                        <Link className="header__logo logo" to="/" onClick={closeMenu}>
                            <img src={logo} alt="logo" />
                        </Link>

                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item">
                                    <Link className={`header__nav-link ${isActive('/characters') ? 'active' : ''}`} to="/characters" onClick={closeMenu}>
                                        Characters
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    <Link className={`header__nav-link ${isActive('/houses') ? 'active' : ''}`} to="/houses" onClick={closeMenu}>
                                        Houses
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    <Link className={`header__nav-link ${isActive('/filmography') ? 'active' : ''}`} to="/filmography" onClick={closeMenu}>
                                        Filmography
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    
                                    <a
                                        className="header__nav-link active" // Добавили active
                                        href="#contacts"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToFooter();
                                        }}
                                    >
                                        About us
                                    </a>
                                    
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
