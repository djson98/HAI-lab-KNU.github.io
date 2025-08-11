import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
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
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: any
          }
        }
      }
    }[]
  }
}

const NewsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const news = data.allMarkdownRemark.nodes

  return (
    <Layout activeLink="News">
      <div className="space-y-8">
        {news.length === 0 ? (
          <p className="text-gray-600">No news available yet.</p>
        ) : (
          <div className="space-y-6">
            {news.map((item) => {
              const image = getImage(item.frontmatter.thumbnail)
              return (
                <article key={item.id} className="border-b border-gray-200 pb-6 group hover:bg-gray-50 rounded-lg p-4 -m-4 transition-all duration-300 hover:shadow-md">
                  <Link to={item.fields.slug} className="block">
                    <div className="flex items-center space-x-8">
                      {/* 텍스트 내용 */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-all duration-300 mb-3 group-hover:translate-x-1">
                          {item.frontmatter.title}
                        </h2>
                        <p className="text-sm text-gray-500 mb-3 group-hover:text-gray-600 transition-colors duration-300">
                          {item.frontmatter.date}
                        </p>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {item.frontmatter.description || item.excerpt}
                        </p>
                      </div>
                      
                      {/* 썸네일 이미지 */}
                      <div className="flex-shrink-0">
                        <div className="w-56 h-36 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                          {image ? (
                            <GatsbyImage
                              image={image}
                              alt={item.frontmatter.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                              <span className="text-sm">No Image</span>
                            </div>
                          )}
                        </div>
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
      filter: { fileAbsolutePath: { regex: "/content/news/" } }
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
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 192, height: 128, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`

export default NewsPage 