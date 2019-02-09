import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import MessageItem from '../components/Message'

export const MessageTemplate = ({ helmet, post }) => {
  return (
    <div>
      {helmet || ''}
      <MessageItem isLink={false} post={post} />
    </div>
  )
}

MessageTemplate.propTypes = {
  post: PropTypes.object,
  helmet: PropTypes.object,
}

const Message = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <MessageTemplate
        post={post}
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
      fields {
        slug
      }
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
