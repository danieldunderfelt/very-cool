import React from 'react'
import styles from '../style/Header.module.scss'
import { ReactComponent as Twitter } from '../icons/twitter.svg'
import { ReactComponent as Discord } from '../icons/discord.svg'
import { ReactComponent as Email } from '../icons/email.svg'
import { Link } from 'gatsby'

const LinkList = ({ className }) => {
  return (
    <div className={className}>
      <h5 className={styles.LinkListHeading}>Find VERYCOOL on</h5>
      <ul className={styles.LinkList}>
        <li>
          <a
            href="https://twitter.com/verycooltech"
            target="_blank"
            rel="noopener noreferrer">
            <Twitter /> @verycooltech
          </a>
        </li>
        <li>
          <a
            href="https://discord.gg/rqWmCnX"
            target="_blank"
            rel="noopener noreferrer">
            <Discord /> Get invited on Discord
          </a>
        </li>
        <li>
          <a
            href="mailto:editor@verycool.tech"
            target="_blank"
            rel="noopener noreferrer">
            <Email /> editor@verycool.tech
          </a>
        </li>
      </ul>
      <ul className={styles.PageList}>
        <li>
          <Link to="/articles/2019-02-13-welcome-to-very-cool/">
            Introduction post
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy policy</Link>
        </li>
      </ul>
    </div>
  )
}

export default LinkList
