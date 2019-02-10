import React from 'react'
import style from '../style/PostList.module.scss'
import Post from './Post'
import Message from './Message'
import get from 'lodash/get'
import { graphql } from 'gatsby'

const ARTICLE_TEMPLATE = 'article'
const MESSAGE_TEMPLATE = 'message'

class PostIndex extends React.Component {
  render() {
    const { posts, highlightFirst = false } = this.props
    let didHighlight = []

    return (
      <section className={style.PostsList}>
        {posts.map(({ node: post }) => {
          const template = get(post, 'frontmatter.template', ARTICLE_TEMPLATE)
          const pinned = get(post, 'frontmatter.pinned', false)
          let shouldHighlight = false

          if (!didHighlight.includes(template)) {
            if (template === ARTICLE_TEMPLATE && highlightFirst) {
              shouldHighlight = true
              didHighlight.push(template)
            } else if (
              (!highlightFirst || template === MESSAGE_TEMPLATE) &&
              pinned
            ) {
              shouldHighlight = true
              didHighlight.push(template)
            }
          }

          let ListItem

          switch (template) {
            case MESSAGE_TEMPLATE:
              ListItem = Message
              break
            default:
            case ARTICLE_TEMPLATE:
              ListItem = Post
              break
          }

          return (
            <ListItem
              post={post}
              key={post.id}
              isListing={true}
              highlight={shouldHighlight}
            />
          )
        })}
      </section>
    )
  }
}

export default PostIndex

export const postIndexQuery = graphql`
  fragment PostIndexFragment on MarkdownRemarkEdge {
    node {
      excerpt(pruneLength: 400)
      html
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
        pinned
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
