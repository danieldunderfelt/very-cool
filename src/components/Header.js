import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/verycool_logo.png'
import styles from './Header.module.scss'

const Header = class extends React.Component {
  render() {
    return (
      <nav className={styles.Header}>
        <Link to="/" className="navbar-item" title="Logo">
          <img src={ logo } alt="Very Cool" className={ styles.Logo } />
        </Link>
      </nav>
    )
  }
}

export default Header
