import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import get from 'lodash/get'
import PostIndex from '../components/PostIndex'
import SEO from '../components/SEO'
import config from '../../seoConfig'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = get(data, 'allMarkdownRemark.edges', [])

    const hasPinnedMessage = posts.some(
      ({
        node: { frontmatter: { template = 'article', pinned = false } = {} },
      }) => template === 'message' && pinned
    )

    console.log(hasPinnedMessage)

    return (
      <Layout topSpace={hasPinnedMessage}>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostIndex posts={posts} highlightFirst={true} />
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
      sort: {
        order: [ASC, DESC]
        fields: [frontmatter___pinned, frontmatter___date]
      }
      filter: { frontmatter: { template: { in: ["article", "message"] } } }
    ) {
      edges {
        ...PostIndexFragment
      }
    }
  }
`
