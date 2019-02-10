import React from 'react'
import style from '../style/PostList.module.scss'
import Post from './Post'
import Message from './Message'
import get from 'lodash/get'
import { graphql } from 'gatsby'

class PostIndex extends React.Component {
  render() {
    const { posts, highlightFirst = false } = this.props

    return (
      <section className={style.PostsList}>
        {posts.map(({ node: post }, index) => {
          const template = get(post, 'frontmatter.template', 'article')
          let ListItem

          switch (template) {
            case 'message':
              ListItem = Message
              break
            default:
            case 'article':
              ListItem = Post
              break
          }

          return (
            <ListItem
              post={post}
              key={post.id}
              isListing={true}
              highlight={index === 0 && highlightFirst}
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
