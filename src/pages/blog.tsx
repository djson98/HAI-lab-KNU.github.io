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
        image1: string
        image2: string
        image3: string
        image4: string
        people: {
          name: string
          affiliation: string
          photo: string
          homepage: string
        }[]
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              return (
                <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                  <Link to={post.fields.slug} className="block">
                    {/* 썸네일 이미지 */}
                    <div className="w-full h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                      {post.frontmatter.image1 && post.frontmatter.image2 && post.frontmatter.image3 && post.frontmatter.image4 ? (
                        // 4개 이미지: car1, car2 좌우, car3, car4 아래 좌우
                        <div className="w-full h-full flex flex-col p-2">
                          <div className="w-full h-1/2 flex gap-1">
                            <img
                              src={post.frontmatter.image1}
                              alt={`${post.frontmatter.title} - Image 1`}
                              className="w-1/2 h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                            />
                            <img
                              src={post.frontmatter.image2}
                              alt={`${post.frontmatter.title} - Image 2`}
                              className="w-1/2 h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="w-full h-1/2 flex gap-1 mt-1">
                            <img
                              src={post.frontmatter.image3}
                              alt={`${post.frontmatter.title} - Image 3`}
                              className="w-1/2 h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                            />
                            <img
                              src={post.frontmatter.image4}
                              alt={`${post.frontmatter.title} - Image 4`}
                              className="w-1/2 h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      ) : post.frontmatter.image1 && post.frontmatter.image2 && post.frontmatter.image3 ? (
                        // 3개 이미지: car1, car2 좌우, car3 아래
                        <div className="w-full h-full flex flex-col p-2">
                          <div className="w-full h-2/3 flex gap-1">
                            <img
                              src={post.frontmatter.image1}
                              alt={`${post.frontmatter.title} - Image 1`}
                              className="w-1/2 h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                            />
                            <img
                              src={post.frontmatter.image2}
                              alt={`${post.frontmatter.title} - Image 2`}
                              className="w-1/2 h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <img
                            src={post.frontmatter.image3}
                            alt={`${post.frontmatter.title} - Image 3`}
                            className="w-full h-1/3 object-contain rounded-lg mt-1 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : post.frontmatter.image1 && post.frontmatter.image2 ? (
                        // IoT 프로젝트는 상하로, 다른 프로젝트는 좌우로 표시
                        <div className={`w-full h-full p-2 ${post.frontmatter.title.includes('IoT-Enabled') ? 'flex flex-col gap-1' : 'flex gap-1'}`}>
                          <img
                            src={post.frontmatter.image1}
                            alt={`${post.frontmatter.title} - Image 1`}
                            className={`${post.frontmatter.title.includes('IoT-Enabled') ? 'w-full h-1/2' : 'w-1/2 h-full'} object-contain rounded-lg group-hover:scale-105 transition-transform duration-500`}
                          />
                          <img
                            src={post.frontmatter.image2}
                            alt={`${post.frontmatter.title} - Image 2`}
                            className={`${post.frontmatter.title.includes('IoT-Enabled') ? 'w-full h-1/2' : 'w-1/2 h-full'} object-contain rounded-lg group-hover:scale-105 transition-transform duration-500`}
                          />
                        </div>
                      ) : post.frontmatter.thumbnail ? (
                        // 일반 프로젝트: 썸네일 표시
                        <div className="w-full h-full p-4 flex items-center justify-center">
                          <img
                            src={post.frontmatter.thumbnail}
                            alt={post.frontmatter.title}
                            className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        // 이미지 없음
                        <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium">No Image</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* 텍스트 내용 */}
                    <div className="p-4 bg-gradient-to-r from-white to-gray-50 h-1/4 flex items-center justify-center">
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300 leading-tight text-center px-2">
                        {post.frontmatter.title}
                      </h2>
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
          image1
          image2
          image3
          image4
          people {
            name
            affiliation
            photo
            homepage
          }
        }
      }
    }
  }
`

export default BlogPage 