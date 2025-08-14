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
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                          {post.frontmatter.image1 && post.frontmatter.image2 && post.frontmatter.image3 && post.frontmatter.image4 ? (
                            // 4개 이미지: car1, car2 좌우, car3, car4 아래 좌우
                            <div className="w-full h-full flex flex-col">
                              <div className="w-full h-1/2 flex">
                                <img
                                  src={post.frontmatter.image1}
                                  alt={`${post.frontmatter.title} - Image 1`}
                                  className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                                <img
                                  src={post.frontmatter.image2}
                                  alt={`${post.frontmatter.title} - Image 2`}
                                  className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="w-full h-1/2 flex">
                                <img
                                  src={post.frontmatter.image3}
                                  alt={`${post.frontmatter.title} - Image 3`}
                                  className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                                <img
                                  src={post.frontmatter.image4}
                                  alt={`${post.frontmatter.title} - Image 4`}
                                  className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            </div>
                          ) : post.frontmatter.image1 && post.frontmatter.image2 && post.frontmatter.image3 ? (
                            // 3개 이미지: car1, car2 좌우, car3 아래
                            <div className="w-full h-full flex flex-col">
                              <div className="w-full h-2/3 flex">
                                <img
                                  src={post.frontmatter.image1}
                                  alt={`${post.frontmatter.title} - Image 1`}
                                  className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                                <img
                                  src={post.frontmatter.image2}
                                  alt={`${post.frontmatter.title} - Image 2`}
                                  className="w-1/2 h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <img
                                src={post.frontmatter.image3}
                                alt={`${post.frontmatter.title} - Image 3`}
                                className="w-full h-1/3 object-contain group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          ) : post.frontmatter.image1 && post.frontmatter.image2 ? (
                            // IoT 프로젝트는 상하로, 다른 프로젝트는 좌우로 표시
                            <div className={`w-full h-full ${post.frontmatter.title.includes('IoT-Enabled') ? 'flex flex-col' : 'flex'}`}>
                              <img
                                src={post.frontmatter.image1}
                                alt={`${post.frontmatter.title} - Image 1`}
                                className={`${post.frontmatter.title.includes('IoT-Enabled') ? 'w-full h-1/2' : 'w-1/2 h-full'} object-contain group-hover:scale-110 transition-transform duration-300`}
                              />
                              <img
                                src={post.frontmatter.image2}
                                alt={`${post.frontmatter.title} - Image 2`}
                                className={`${post.frontmatter.title.includes('IoT-Enabled') ? 'w-full h-1/2' : 'w-1/2 h-full'} object-contain group-hover:scale-110 transition-transform duration-300`}
                              />
                            </div>
                          ) : post.frontmatter.thumbnail ? (
                            // 일반 프로젝트: 썸네일 표시
                            <img
                              src={post.frontmatter.thumbnail}
                              alt={post.frontmatter.title}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            // 이미지 없음
                            <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
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
                        {/* 프로젝트 설명 제거 - 제목과 날짜만 표시 */}
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
          image1
          image2
          image3
          image4
        }
      }
    }
  }
`

export default BlogPage 