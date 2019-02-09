import React, { Component } from 'react'
import styles from '../style/Article.module.scss'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

class PostTags extends Component {
  render() {
    const { tags = [] } = this.props

    return (
      <>
        {tags && tags.length !== 0 && (
          <div className={styles.PostTags}>
            <ul>
              {tags.map(tag => (
                <li key={`tag_${tag}`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default PostTags
