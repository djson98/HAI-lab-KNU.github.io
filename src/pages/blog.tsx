import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"

type DataProps = {
  allMarkdownRemark: {
    nodes: {
      id: string
      excerpt: string
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        date: string
        description: string
        thumbnail: string
      }
    }[]
  }
}

const BlogPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout activeLink="Projects">
      <div className="space-y-8">
        
        {posts.length === 0 ? (
          <p className="text-gray-600">No projects yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              return (
                <article key={post.id} className="border-b border-gray-200 pb-6 group hover:bg-gray-50 rounded-lg p-4 -m-4 transition-all duration-300 hover:shadow-md">
                  <Link to={post.fields.slug} className="block">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                      {/* 썸네일 이미지 - 모바일에서는 위에, 데스크톱에서는 오른쪽 */}
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                          {post.frontmatter.thumbnail ? (
                            <img
                              src={post.frontmatter.thumbnail}
                              alt={post.frontmatter.title}
                              className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300 mx-auto"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                              <span className="text-sm">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* 텍스트 내용 - 모바일에서는 아래에, 데스크톱에서는 왼쪽 */}
                      <div className="flex-1 min-w-0 text-center md:text-left">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-all duration-300 mb-3 group-hover:translate-x-1">
                          {post.frontmatter.title}
                        </h2>
                        <p className="text-sm text-gray-500 mb-3 group-hover:text-gray-600 transition-colors duration-300">
                          {post.frontmatter.date}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {post.frontmatter.description || post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          thumbnail
        }
      }
    }
  }
`

export default BlogPage 