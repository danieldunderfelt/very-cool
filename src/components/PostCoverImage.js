import React, { Component } from 'react'
import styles from '../style/Article.module.scss'
import get from 'lodash/get'

class PostCoverImage extends Component {
  render() {
    const { coverImage } = this.props

    const src = get(coverImage, 'childImageSharp.fluid.src', '')

    if (!src) {
      return null
    }

    return <img className={styles.CoverImage} alt="cover" src={src} />
  }
}

export default PostCoverImage
