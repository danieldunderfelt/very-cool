import React from 'react'
import { ReactComponent as Clock } from '../icons/clock.svg'
import styles from '../style/Article.module.scss'

export default function TimeDisplay({ date }) {
  return (
    <div className={styles.TimeDisplay}>
      <Clock /> {date}
    </div>
  )
}
