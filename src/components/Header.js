import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/verycool_logo.png'
import styles from '../style/Header.module.scss'

const Header = class extends React.Component {
  render() {
    return (
      <nav className={styles.Header}>
        <div className={styles.HeaderContent}>
          <Link to="/" title="Logo" className={styles.Logo}>
            <img src={logo} alt="Very Cool" />
          </Link>
          <div className={styles.mobileHide}>
            <p>
              This is is a collection of <em>very cool</em> things we've found
              in our modern world of technological progress. Enjoy!
            </p>
            <p>
              Created by{' '}
              <a
                title="DanielDunderfelt.com"
                href="https://danieldunderfelt.com">
                Daniel Dunderfelt
              </a>
              .
            </p>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
