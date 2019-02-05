import React, { Component } from 'react'
import { Link } from 'gatsby'
import styles from '../style/Article.module.scss'
import commonStyles from '../style/Common.module.scss'
import { kebabCase } from 'lodash'
import TimeDisplay from './TimeDisplay'
import Author from './Author'
import PostCoverImage from './PostCoverImage'

class Post extends Component {
  render() {
    const { post } = this.props
    const { frontmatter, fields, excerpt } = post
    const { tags = [], title, date, author, cover_image } = frontmatter

    return (
      <div className={styles.PostWrapper}>
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
        <Link className={commonStyles.HeadingLink} to={fields.slug}>
          <h2>{title}</h2>
          <div className={styles.PostMeta}>
            <Author name={author} />
            <TimeDisplay date={date} />
          </div>
          <p>{excerpt}</p>
          <PostCoverImage coverImage={cover_image} />
        </Link>
      </div>
    )
  }
}

export default Post
