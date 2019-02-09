import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import get from 'lodash/get'
import PostIndex from '../components/PostIndex'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = get(data, 'allMarkdownRemark.edges', [])

    return (
      <Layout>
        <PostIndex posts={posts} />
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
      filter: { frontmatter: { template: { in: ["article", "message"] } } }
    ) {
      edges {
        ...PostIndexFragment
      }
    }
  }
`
