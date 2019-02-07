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
import PostCoverImage from '../components/PostCoverImage'
import classnames from 'classnames'

export const ArticleTemplate = ({ contentComponent, helmet, post }) => {
  const PostContent = contentComponent || Content
  const {
    frontmatter: { tags = [], date, title, cover_image },
    html,
  } = post

  return (
    <div className={layoutStyles.Page}>
      <section
        className={classnames(commonStyles.PageContent, styles.ArticlePage)}>
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
        <h1 className={styles.ArticleHeading}>{title}</h1>
        <div className={styles.PostMeta}>
          <Author name="Daniel Dunderfelt" />
          <TimeDisplay date={date} />
        </div>
        <PostCoverImage coverImage={cover_image} />
        <PostContent content={html} />
      </section>
    </div>
  )
}

ArticleTemplate.propTypes = {
  contentComponent: PropTypes.func,
  post: PropTypes.object,
  helmet: PropTypes.object,
}

const Article = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ArticleTemplate
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

Article.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Article

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        author
        cover_image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
