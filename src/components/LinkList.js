import React from 'react'
import styles from '../style/Header.module.scss'
import { ReactComponent as Twitter } from '../icons/twitter.svg'
import { ReactComponent as Discord } from '../icons/discord.svg'
import { ReactComponent as Email } from '../icons/email.svg'

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
          <a href="mailto:editor@verycool.tech" target="_blank">
            <Email /> editor@verycool.tech
          </a>
        </li>
      </ul>
    </div>
  )
}

export default LinkList
