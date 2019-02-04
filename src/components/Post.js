import React, { Component } from 'react'
import { Link } from 'gatsby'
import styles from '../style/Article.module.scss'

class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <div className={styles.ArticleWrapper}>
        <p>
          <Link className="has-text-primary" to={post.fields.slug}>
            {post.frontmatter.title}
          </Link>
          <span> &bull; </span>
          <small>{post.frontmatter.date}</small>
        </p>
        <p>
          {post.excerpt}
          <br />
          <br />
          <Link className="button is-small" to={post.fields.slug}>
            Keep Reading →
          </Link>
        </p>
      </div>
    )
  }
}

export default Post
