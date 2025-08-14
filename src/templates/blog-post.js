import * as React from "react"
import { Link, graphql } from "gatsby"
import { FaFilePdf, FaCode, FaHome } from "react-icons/fa"

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
          {post.frontmatter.date && (
            <p className="text-lg text-gray-500 mt-4">
              {post.frontmatter.date}
            </p>
          )}
        </header>


        {/* Hero Image - Abstract 위에 표시 */}
        {post.frontmatter.hero_image && (
          <section className="mb-12">
            <div className="flex justify-center">
              <img
                src={post.frontmatter.hero_image}
                alt={post.frontmatter.title}
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </section>
        )}

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
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Publications</h2>
            <div className="space-y-6">
              {post.frontmatter.publications
                .filter(pub => pub.title && pub.title.trim() !== '')
                .map((pub, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{pub.authors}</p>
                  <p className="text-gray-500 mb-4">{pub.venue}</p>
                  
                  {/* PDF/Code 버튼들 */}
                  <div className="flex space-x-2">
                    {pub.pdf && pub.pdf.trim() !== '' && (
                      <a
                        href={pub.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors duration-200"
                      >
                        <FaFilePdf className="mr-1.5 w-3 h-3" />
                        PDF
                      </a>
                    )}
                    {pub.code && pub.code.trim() !== '' && (
                      <a
                        href={pub.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors duration-200"
                      >
                        <FaCode className="mr-1.5 w-3 h-3" />
                        Code
                      </a>
                    )}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {post.frontmatter.people.map((person, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-gray-200">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl font-bold">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{person.affiliation}</p>
                  {person.homepage && (
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <FaHome className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
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
          hero_image
          publications {
            title
            authors
            venue
            pdf
            code
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
