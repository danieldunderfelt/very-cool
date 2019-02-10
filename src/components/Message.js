import React, { Component } from 'react'
import articleStyles from '../style/Article.module.scss'
import TimeDisplay from './TimeDisplay'
import Author from './Author'
import PostMediaImage from './PostMediaImage'
import { HTMLContent } from './Content'
import PostTags from './PostTags'
import classnames from 'classnames'
import { Link } from 'gatsby'

class Message extends Component {
  render() {
    const { post, isLink = true, isListing = false } = this.props
    const { frontmatter, fields, html } = post
    const { tags = [], date, author, media_image } = frontmatter

    const LinkComponent = isLink ? Link : 'div'

    return (
      <div
        className={classnames(
          articleStyles.Message,
          !isLink ? articleStyles.NoEffectMessage : '',
          isListing ? articleStyles.InPostListing : ''
        )}>
        <Author name={author} />
        <HTMLContent content={html} />
        {media_image && <PostMediaImage mediaImage={media_image} />}
        <div
          className={classnames(
            articleStyles.PostMeta,
            articleStyles.MessageMeta
          )}>
          <PostTags tags={tags} />
          <LinkComponent to={fields.slug}>
            <TimeDisplay date={date} />
          </LinkComponent>
        </div>
      </div>
    )
  }
}

export default Message
