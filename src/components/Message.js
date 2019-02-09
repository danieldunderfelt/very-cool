import React, { Component } from 'react'
import articleStyles from '../style/Article.module.scss'
import TimeDisplay from './TimeDisplay'
import Author from './Author'
import PostMediaImage from './PostMediaImage'
import { HTMLContent } from './Content'
import PostTags from './PostTags'
import classnames from 'classnames'

class Message extends Component {
  render() {
    const { post } = this.props
    const { frontmatter, html } = post
    const { tags = [], date, author, media_image } = frontmatter

    return (
      <div className={articleStyles.Message}>
        <PostTags tags={tags} />
        <HTMLContent content={html} />
        {media_image && <PostMediaImage mediaImage={media_image} />}
        <div
          className={classnames(
            articleStyles.PostMeta,
            articleStyles.MessageMeta
          )}>
          <Author name={author} />
          <TimeDisplay date={date} />
        </div>
      </div>
    )
  }
}

export default Message
