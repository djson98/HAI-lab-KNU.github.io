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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white rounded-3xl mx-6">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6" id="main-heading">
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
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-4 rounded-lg bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex="0" role="region" aria-labelledby="hci-title">
                  <FaRobot className="w-16 h-16 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-gray-900 mb-1" id="hci-title">
                  Human-Computer Interaction
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Designing intuitive and effective interfaces for human-AI interaction
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex="0" role="region" aria-labelledby="ubiquitous-title">
                  <HiOutlineGlobeAlt className="w-16 h-16 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-gray-900 mb-1" id="ubiquitous-title">
                  Ubiquitous Computing
                  </h3>
                  <p className="text-xs text-gray-600">
                    Exploring AI systems that seamlessly integrate into everyday environments
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2" tabIndex="0" role="region" aria-labelledby="ml-title">
                  <HiOutlineChip className="w-16 h-16 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-gray-900 mb-1" id="ml-title">
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
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" id="recent-projects-heading">
                Recent Projects
              </h2>
              <Link
                to="/blog"
                className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              >
                View All 
              </Link>
            </div>
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => {
                  return (
                    <div key={post.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg hover:scale-105 hover:border-blue-200 border border-transparent transition-all duration-300 aspect-square cursor-pointer">
                      {/* 썸네일 */}
                      <div className="mb-3">
                        <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                          {post.frontmatter.thumbnail ? (
                            <img
                              src={post.frontmatter.thumbnail}
                              alt={post.frontmatter.title}
                              className="w-3/4 h-3/4 object-contain mx-auto"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                              <span className="text-sm">No Image</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* 프로젝트 제목만 */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-3">
                          {post.frontmatter.title}
                        </h3>
                      </div>
                    </div>
                  )
                })}
              </div>
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
        <div className="max-w-4xl mx-auto px-6">
          <hr className="border-gray-200 opacity-50 my-8" />
        </div>

        {/* Recent News Section */}
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
                  <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-105 hover:border-blue-200 border border-transparent transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      {/* 썸네일 */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
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
                      
                      {/* 뉴스 정보 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                          {item.frontmatter.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.frontmatter.date}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
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

        {/* 구분선 */}
        <div className="max-w-4xl mx-auto px-6">
          <hr className="border-gray-200 opacity-50 my-8" />
        </div>

        {/* Contact Section */}
        <section className="py-16 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 hover:border-blue-200 border border-transparent transition-all duration-300 cursor-pointer mx-6" aria-labelledby="contact-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" id="contact-heading">
            Contact Us
            </h2>
            <p className="text-base text-gray-600 mb-8">
            We're looking for passionate people to join the Human AI Interaction Lab.

If you're excited about designing better interactions between humans and AI—
and want to explore the intersection of HCI, Ubiquitous Computing, Behavioral Science, and Machine Learning—
join us.

            </p>
            
            {/* 연락처 정보 */}
            <div className="space-y-4 text-center">
              {/* 이메일 */}
              <div className="flex items-center justify-center space-x-3">
                <a 
                  href="mailto:kimauk@hai.kangwon.ac.kr"
                  className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
                  title="Click to send email"
                >
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <svg 
                    className="h-5 w-auto" 
                    viewBox="0 0 300 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <text 
                      x="150" 
                      y="15" 
                      fontFamily="system-ui, -apple-system, sans-serif" 
                      fontSize="14" 
                      fontWeight="500" 
                      fill="#6B7280"
                      className="select-none"
                      textAnchor="middle"
                    >
                      kimauk@hai.kangwon.ac.kr
                    </text>
                  </svg>
                </a>
              </div>
              
              {/* 룸 넘버 */}
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <svg 
                  className="h-5 w-auto" 
                  viewBox="0 0 400 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text 
                    x="200" 
                    y="15" 
                    fontFamily="system-ui, -apple-system, sans-serif" 
                    fontSize="14" 
                    fontWeight="500" 
                    fill="#6B7280"
                    className="select-none"
                    textAnchor="middle"
                  >
                    Room 512, College of Engineering 6
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>
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
