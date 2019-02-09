import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import styles from '../style/Article.module.scss'
import commonStyles from '../style/Common.module.scss'
import layoutStyles from '../style/Layout.module.scss'
import Author from '../components/Author'
import TimeDisplay from '../components/TimeDisplay'
import PostMediaImage from '../components/PostMediaImage'
import classnames from 'classnames'

export const MessageTemplate = ({ contentComponent, helmet, post }) => {
  const PostContent = contentComponent || Content
  const {
    frontmatter: { tags = [], date, title, media_image },
    html,
  } = post

  return (
    <div className={layoutStyles.Page}>
      <section
        className={classnames(commonStyles.PageContent, styles.MessagePage)}>
        {helmet || ''}
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
        <h1 className={styles.MessageHeading}>{title}</h1>
        <div className={styles.PostMeta}>
          <Author name="Daniel Dunderfelt" />
          <TimeDisplay date={date} />
        </div>
        <PostMediaImage mediaImage={media_image} />
        <PostContent content={html} />
      </section>
    </div>
  )
}

MessageTemplate.propTypes = {
  contentComponent: PropTypes.func,
  post: PropTypes.object,
  helmet: PropTypes.object,
}

const Message = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <MessageTemplate
        post={post}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

Message.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Message

export const pageQuery = graphql`
  query MessageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        tags
        author
        media_image {
          childImageSharp {
            fluid {
              src
              aspectRatio
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`
