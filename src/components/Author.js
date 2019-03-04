import React from 'react'
import styles from '../style/Article.module.scss'

export default function Author({ author }) {
  const { name, avatar } = author
  
  return (
    <div className={styles.AuthorDisplay}>
      <img alt={name} src={avatar} /> {name}
    </div>
  )
}
