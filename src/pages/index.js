import * as React from "react"
import { Link, graphql } from "gatsby"
import { FaRobot } from "react-icons/fa"
import { HiOutlineGlobeAlt, HiOutlineChip } from "react-icons/hi"


import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes.slice(0, 3) // 최신 프로젝트 3개 가져오기
  const news = data.allNews.nodes.slice(0, 3) // 최신 뉴스 3개 가져오기
  
  return (
    <Layout activeLink="Home">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white rounded-3xl mx-2 md:mx-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6" id="main-heading">
             Human-AI Interaction Lab 
            </h1>
            <p className="text-xl font-semibold text-gray-800 mb-6 leading-tight tracking-wide">
            Understanding and Designing Human Interactions with AI Systems
            </p>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
              We focus on how to design and support meaningful human interactions with AI systems in everyday life.
              Our research investigates when and how AI should engage with people—respectfully, effectively, and intelligently.
            </p>
            
            {/* Research Areas Section */}
            <div className="mt-16">
              <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                <div className="text-center p-3 md:p-4 rounded-lg bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex="0" role="region" aria-labelledby="hci-title">
                  <FaRobot className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1" id="hci-title">
                  Human-Computer Interaction
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Designing intuitive and effective interfaces for human-AI interaction
                  </p>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex="0" role="region" aria-labelledby="ubiquitous-title">
                  <HiOutlineGlobeAlt className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1" id="ubiquitous-title">
                  Ubiquitous Computing
                  </h3>
                  <p className="text-xs text-gray-600">
                    Exploring AI systems that seamlessly integrate into everyday environments
                  </p>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex="0" role="region" aria-labelledby="ml-title">
                  <HiOutlineChip className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1" id="ml-title">
                  Machine Learning & Mobile Sensing
                  </h3>
                  <p className="text-xs text-gray-600">
                    Developing intelligent systems using mobile sensors and ML algorithms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Publications Section */}
        <section className="py-16 bg-white" aria-labelledby="recent-projects-heading">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" id="recent-projects-heading">
                Recent Projects
              </h2>
            </div>
            {posts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                  {posts.map((post) => {
                    return (
                      <Link 
                        to={post.fields.slug} 
                        key={post.id} 
                        className="block bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-lg hover:scale-105 hover:border-blue-200 border border-transparent transition-all duration-300 cursor-pointer"
                      >
                        {/* 썸네일 */}
                        <div className="mb-3">
                          <div className="w-full h-24 md:h-40 rounded-lg overflow-hidden shadow-sm">
                            {post.frontmatter.image1 && post.frontmatter.image2 && post.frontmatter.image3 && post.frontmatter.image4 ? (
                              // 4개 이미지: car1, car2 좌우, car3, car4 아래 좌우
                              <div className="w-full h-full flex flex-col">
                                <div className="w-full h-1/2 flex">
                                  <img
                                    src={post.frontmatter.image1}
                                    alt={`${post.frontmatter.title} - Image 1`}
                                    className="w-1/2 h-full object-contain"
                                  />
                                  <img
                                    src={post.frontmatter.image2}
                                    alt={`${post.frontmatter.title} - Image 2`}
                                    className="w-1/2 h-full object-contain"
                                  />
                                </div>
                                <div className="w-full h-1/2 flex">
                                  <img
                                    src={post.frontmatter.image3}
                                    alt={`${post.frontmatter.title} - Image 3`}
                                    className="w-1/2 h-full object-contain"
                                  />
                                  <img
                                    src={post.frontmatter.image4}
                                    alt={`${post.frontmatter.title} - Image 4`}
                                    className="w-1/2 h-full object-contain"
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
                                    className="w-1/2 h-full object-contain"
                                  />
                                  <img
                                    src={post.frontmatter.image2}
                                    alt={`${post.frontmatter.title} - Image 2`}
                                    className="w-1/2 h-full object-contain"
                                  />
                                </div>
                                <img
                                  src={post.frontmatter.image3}
                                  alt={`${post.frontmatter.title} - Image 3`}
                                  className="w-full h-1/3 object-contain"
                                />
                              </div>
                            ) : post.frontmatter.image1 && post.frontmatter.image2 ? (
                              // IoT 프로젝트는 상하로, 다른 프로젝트는 좌우로 표시
                              <div className={`w-full h-full ${post.frontmatter.title.includes('IoT-Enabled') ? 'flex flex-col' : 'flex'}`}>
                                <img
                                  src={post.frontmatter.image1}
                                  alt={`${post.frontmatter.title} - Image 1`}
                                  className={`${post.frontmatter.title.includes('IoT-Enabled') ? 'w-full h-1/2' : 'w-1/2 h-full'} object-contain`}
                                />
                                <img
                                  src={post.frontmatter.image2}
                                  alt={`${post.frontmatter.title} - Image 2`}
                                  className={`${post.frontmatter.title.includes('IoT-Enabled') ? 'w-full h-1/2' : 'w-1/2 h-full'} object-contain`}
                                />
                              </div>
                            ) : post.frontmatter.thumbnail ? (
                              // 일반 프로젝트: 썸네일 표시
                              <img
                                src={post.frontmatter.thumbnail}
                                alt={post.frontmatter.title}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              // 이미지 없음
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="text-xs md:text-sm">No Image</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                                              {/* 프로젝트 제목만 */}
                      <div className="text-center">
                        <h3 className="text-base md:text-lg font-bold text-gray-900">
                          {post.frontmatter.title}
                        </h3>
                      </div>
                      </Link>
                    )
                  })}
                </div>
                
                {/* View All 링크를 프로젝트들 아래에 배치 */}
                <div className="text-center mt-8">
                  <Link
                    to="/blog"
                    className="inline-block text-blue-500 hover:text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-4 py-2 transition-all duration-200"
                  >
                    View All Projects
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 text-center py-8">
                  최근 프로젝트가 여기에 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 구분선 */}
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <hr className="border-gray-200 opacity-50 my-8" />
        </div>

        {/* Recent News Section - Hidden for now, will be developed later */}
        {/* 
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white rounded-3xl mx-6" aria-labelledby="news-heading">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" id="news-heading">
               News
              </h2>
              <Link
                to="/news"
                className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              >
                View All 
              </Link>
            </div>
            {news.length > 0 ? (
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-lg hover:scale-105 hover:border-blue-200 border border-transparent transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                          {item.frontmatter.thumbnail ? (
                            <img
                              src={item.frontmatter.thumbnail}
                              alt={item.frontmatter.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                          {item.frontmatter.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mb-2">
                          {item.frontmatter.date}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                          {item.frontmatter.description || item.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 text-center py-8">
                  최근 뉴스가 여기에 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </section>
        */}

        {/* 구분선 */}
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <hr className="border-gray-200 opacity-50 my-8" />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
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
      allNews: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/news/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 3
      ) {
        nodes {
          id
          excerpt
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

export const Head = () => <Seo title="HaiLab - 인공지능 연구실" />
