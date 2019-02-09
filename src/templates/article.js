import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import styles from '../style/Article.module.scss'
import commonStyles from '../style/Common.module.scss'
import layoutStyles from '../style/Layout.module.scss'
import Author from '../components/Author'
import TimeDisplay from '../components/TimeDisplay'
import PostMediaImage from '../components/PostMediaImage'
import classnames from 'classnames'
import PostTags from '../components/PostTags'
import get from 'lodash/get'
import SEO from '../components/SEO'

export const ArticleTemplate = ({ contentComponent, helmet, post }) => {
  const PostContent = contentComponent || Content
  const {
    frontmatter: { tags = [], date, title, media_image, author },
    html,
  } = post

  return (
    <div className={layoutStyles.Page}>
      <section
        className={classnames(commonStyles.PageContent, styles.ArticlePage)}>
        {helmet || ''}
        <PostTags tags={tags} />
        <h1 className={styles.ArticleHeading}>{title}</h1>
        <div className={styles.PostMeta}>
          <Author name={author} />
          <TimeDisplay date={date} />
        </div>
        <PostMediaImage mediaImage={media_image} />
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
  const {
    markdownRemark: post,
    site: { siteMetadata: metaData },
  } = data
  const {
    fields,
    excerpt,
    longExcerpt,
    frontmatter: { title, author, tags, media_image, normalDate },
  } = post

  const page = {
    titleAlt: 'verycool.tech article: ' + title,
    url: metaData.siteUrl + get(fields, 'slug', ''),
    title: title,
    image: metaData.siteLogo,
    main: false,
    description: excerpt,
    keywords: tags,
  }

  const article = {
    title: title,
    url: metaData.siteUrl + get(fields, 'slug', ''),
    imgUrl: get(media_image, 'childImageSharp.fluid.src', ''),
    imgWidth: get(media_image, 'childImageSharp.fixed.width', ''),
    imgHeight: get(media_image, 'childImageSharp.fixed.height', ''),
    date: normalDate,
    tags: tags,
    description: longExcerpt,
    authorName: author,
  }

  return (
    <Layout>
      <ArticleTemplate
        post={post}
        contentComponent={HTMLContent}
        helmet={<SEO page={page} article={article} />}
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
    site {
      siteMetadata {
        siteUrlShort
        siteUrl
        siteTitle
        siteLogo
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 256)
      longExcerpt: excerpt(pruneLength: 400)
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        normalDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZZ")
        title
        tags
        author
        media_image {
          childImageSharp {
            fixed {
              width
              height
            }
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
