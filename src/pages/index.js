import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import get from 'lodash/get'
import style from './FrontPage.module.scss'
import Post from '../components/Post'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = get(data, 'allMarkdownRemark.edges', [])

    return (
      <Layout>
        <section className={style.PostsList}>
          {posts.map(({ node: post }) => (
            <Post post={post} key={post.id} />
          ))}
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "article" } } }
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
          }
        }
      }
    }
  }
`
