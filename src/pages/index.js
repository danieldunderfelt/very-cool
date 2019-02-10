import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import get from 'lodash/get'
import partition from 'lodash/partition'
import PostIndex from '../components/PostIndex'
import SEO from '../components/SEO'
import config from '../../seoConfig'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    let posts = get(data, 'allMarkdownRemark.edges', [])

    const hasPinnedMessage = posts.some(
      ({ node: { frontmatter: { template = 'article', pinned = 0 } = {} } }) =>
        template === 'message' && pinned
    )

    const hasPinnedArticle = posts.some(
      ({ node: { frontmatter: { template = 'article', pinned = 0 } = {} } }) =>
        template === 'article' && pinned
    )

    if (hasPinnedArticle) {
      posts = partition(posts, 'node.frontmatter.pinned').reduce(
        (sortedPosts, postGroup) => {
          sortedPosts = sortedPosts.concat(postGroup)
          return sortedPosts
        },
        []
      )
    }

    return (
      <Layout topSpace={hasPinnedMessage}>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostIndex posts={posts} highlightFirst={!hasPinnedArticle} />
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
        order: [DESC, DESC]
        fields: [frontmatter___date, frontmatter___pinned]
      }
      filter: { frontmatter: { template: { in: ["article", "message"] } } }
    ) {
      edges {
        ...PostIndexFragment
      }
    }
  }
`
