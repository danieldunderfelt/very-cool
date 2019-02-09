import React, { Component } from 'react'
import styles from '../style/Article.module.scss'
import get from 'lodash/get'

class PostMediaImage extends Component {
  render() {
    const { mediaImage } = this.props
    const fluid = get(mediaImage, 'childImageSharp.fluid', null)

    if (!fluid) {
      return null
    }

    return (
      <picture className={styles.MediaImage}>
        <source srcSet={fluid.srcSet} sizes={fluid.sizes} />
        <img alt="Web Development" src={fluid.src} />
      </picture>
    )
  }
}

export default PostMediaImage
