import * as React from "react"
import { Link, graphql } from "gatsby"
import { FaFilePdf, FaCode, FaHome, FaPlay } from "react-icons/fa"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* 제목 섹션 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              {post.frontmatter.subtitle}
            </p>
          )}
        </header>






        {/* Abstract 섹션 */}
        {post.frontmatter.description && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Abstract</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {post.frontmatter.description}
              </p>
            </div>
          </section>
        )}

        {/* Publications 섹션 - 실제 내용이 있을 때만 표시 */}
        {post.frontmatter.publications && 
         post.frontmatter.publications.length > 0 && 
         post.frontmatter.publications.some(pub => pub.title && pub.title.trim() !== '') && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Publications</h2>
            <div className="space-y-3">
              {post.frontmatter.publications
                .filter(pub => pub.title && pub.title.trim() !== '')
                .map((pub, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{pub.authors}</p>
                  <p className="text-gray-500 text-sm mb-2">{pub.venue}</p>
                  
                  {/* PDF/Code/Video 버튼들 */}
                  <div className="flex space-x-2">
                    {pub.pdf && pub.pdf.trim() !== '' && (
                      <a
                        href={pub.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        <FaFilePdf className="mr-1 w-2.5 h-2.5" />
                        PDF
                      </a>
                    )}
                    {pub.video && pub.video.trim() !== '' && (
                      <a
                        href={pub.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors duration-200"
                      >
                        <FaPlay className="mr-1 w-2.5 h-2.5" />
                        Video
                      </a>
                    )}
                    {pub.code && pub.code.trim() !== '' && (
                      <a
                        href={pub.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded hover:bg-gray-600 transition-colors duration-200"
                      >
                        <FaCode className="mr-1 w-2.5 h-2.5" />
                        Code
                      </a>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Articles 섹션 - 실제 내용이 있을 때만 표시 */}
        {post.frontmatter.articles && 
         post.frontmatter.articles.length > 0 && 
         post.frontmatter.articles.some(article => article.title && article.title.trim() !== '') && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Articles</h2>
            <div className="space-y-3">
              {post.frontmatter.articles
                .filter(article => article.title && article.title.trim() !== '')
                .map((article, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{article.source} • {article.date}</p>
                  
                  {/* Article Link 버튼 */}
                  <div className="flex space-x-2">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition-colors duration-200"
                    >
                      <FaHome className="mr-1 w-2.5 h-2.5" />
                      Read Article
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}



        {/* People 섹션 */}
        {post.frontmatter.people && post.frontmatter.people.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">People</h2>
            <div className="flex justify-center">
              <div className="flex gap-8 max-w-6xl">
                {post.frontmatter.people.map((person, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-2 rounded-full overflow-hidden border-3 border-gray-200">
                      {person.photo ? (
                        <img
                          src={person.photo}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-xl font-bold">
                            {person.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{person.name}</h3>
                    <p className="text-gray-600 text-xs mb-1">{person.affiliation}</p>
                    {person.homepage && (
                      <a
                        href={person.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <FaHome className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id } ) {
      id
      excerpt(pruneLength: 160)
      html
              frontmatter {
          title
          subtitle
          date(formatString: "MMMM DD, YYYY")
          description
          thumbnail
          publications {
            title
            authors
            venue
            pdf
            video
            code
          }
          articles {
            title
            source
            date
            url
            description
          }
          people {
            name
            affiliation
            photo
            homepage
          }
        }
    }
    previous: markdownRemark(id: { eq: $previousPostId } ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId } ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
