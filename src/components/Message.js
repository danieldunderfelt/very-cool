import React, { Component } from 'react'
import articleStyles from '../style/Article.module.scss'
import TimeDisplay from './TimeDisplay'
import Author from './Author'
import PostMediaImage from './PostMediaImage'
import { HTMLContent } from './Content'
import PostTags from './PostTags'
import classnames from 'classnames'
import commonStyles from '../style/Common.module.scss'
import { Link } from 'gatsby'

class Message extends Component {
  render() {
    const { post, isLink = true } = this.props
    const { frontmatter, fields, html } = post
    const { tags = [], date, author, media_image } = frontmatter

    const ContentWrapper = isLink ? Link : 'div'

    return (
      <div
        className={classnames(
          articleStyles.Message,
          !isLink ? articleStyles.NoEffectMessage : ''
        )}>
        <PostTags tags={tags} />
        <ContentWrapper className={commonStyles.HeadingLink} to={fields.slug}>
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
        </ContentWrapper>
      </div>
    )
  }
}

export default Message
