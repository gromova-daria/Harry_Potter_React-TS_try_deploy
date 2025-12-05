// src/components/Footer/Footer.tsx
import React from 'react';
import logo from '../../assets/images/logo.svg'; // Импортируем логотип

const Footer: React.FC = () => {
  // Функция для прокрутки вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer" id="contacts">
      <div className="footer__main">
        <div className="container">
          <div className="footer__columns">
            <div className="footer__column">
              <img 
                src={logo} 
                alt="Harry Potter logo" 
                className="footer__logo" 
              />
              <p className="footer__text">
                The website was created by students of educational groups 23CST-4 and 23CST-5. 
                We put our whole soul and even a few tears into it, working with our favorite childhood characters.
              </p>
            </div>
            <div className="footer__column">
              {/* Пустая колонка для сетки */}
            </div>
            <div className="footer__column">
              <h3 className="footer__title">DEVELOPERS</h3>
              <ul className="footer__list">
                <li className="footer__list-item">Durnina Lilia</li>
                <li className="footer__list-item">Gromova Daria</li>
                <li className="footer__list-item">Chuprova Natalia</li>
                <li className="footer__list-item">Mayorova Maria</li>
              </ul>
            </div>
            <div className="footer__column">
              <h3 className="footer__title">CONTACT US</h3>
              <ul className="footer__list">
                <li className="footer__list-item">lsdurnina@edu.hse.ru</li>
                <li className="footer__list-item">dsgromova@edu.hse.ru</li>
                <li className="footer__list-item">npchuprova@edu.hse.ru</li>
                <li className="footer__list-item">mvmaiorova@edu.hse.ru</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <button 
            className="footer__top-button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            Go to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
