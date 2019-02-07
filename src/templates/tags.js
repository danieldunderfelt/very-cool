import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import postsListStyle from '../style/PostsList.module.scss'
import Post from '../components/Post'
import get from 'lodash/get'

class TagRoute extends React.Component {
  render() {
    const { data } = this.props
    const posts = get(data, 'allMarkdownRemark.edges', [])

    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title

    return (
      <Layout>
        <Helmet title={`${tag} | ${title}`} />
        <section className={postsListStyle.PostsList}>
          <h3 className={postsListStyle.ListHeading}>
            Posts with tag{' '}
            <strong className={postsListStyle.HeadingTag}>{tag}</strong>
          </h3>
          {posts.map(({ node: post }) => (
            <Post post={post} key={post.id} />
          ))}
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, template: { eq: "article" } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            template
            date(formatString: "MMMM DD, YYYY")
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
    }
  }
`
