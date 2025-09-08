import * as React from "react"
import { Link, graphql } from "gatsby"
import { FaRobot } from "react-icons/fa"
import { HiOutlineGlobeAlt, HiOutlineChip } from "react-icons/hi"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes.slice(0, 3) // 최신 프로젝트 3개로 되돌림
  const news = data.allNews.nodes.slice(0, 3) // 최신 뉴스 3개
  const members = data.allMembers.nodes // 멤버 정보
  
  return (
    <>
      {/* Hero Section - 2열 레이아웃으로 텍스트와 워드클라우드 배치 */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-blue-50 via-blue-10 to-white w-full">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* 왼쪽 텍스트 영역 */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-light text-black mb-6" id="main-heading">
               Human-AI Interaction Lab 
              </h1>
              <p className="text-base text-gray-600 leading-relaxed font-light mb-8">
                We focus on how to design meaningful human interactions with AI systems in everyday life.
                Our goal is making proactive AI agents that understand user context and behavior to give helpful suggestions, like <em>JARVIS</em> from Iron Man.
              </p>
              
              {/* Research Areas */}
              <div className="space-y-4">
                <h2 className="text-lg font-light text-gray-800 mb-4">Research Areas</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 text-xs font-light bg-white text-gray-700 rounded-full">
                    Human-Computer Interaction
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-light bg-white text-gray-700 rounded-full">
                    Ubiquitous Computing
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-light bg-white text-gray-700 rounded-full">
                    Proactive Systems
                  </span>
                </div>
              </div>
            </div>
            
            {/* 오른쪽 워드클라우드 영역 */}
            <div className="text-center md:text-left">
              <div className="max-w-sm mx-auto">
                <img
                  src="/images/wctransparent.png"
                  alt="HAI Lab Research Keywords Word Cloud"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Layout activeLink="Home">
        {/* Recent Projects Section */}
        <section className="pt-8 pb-8 bg-white" aria-labelledby="recent-projects-heading">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6" id="recent-projects-heading">
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
                        className="block bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer"
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
                        
                        {/* 프로젝트 제목과 태그 */}
                        <div className="text-center">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                            {post.frontmatter.title}
                          </h3>
                          {/* 프로젝트 태그 표시 */}
                          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-1">
                              {post.frontmatter.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* 참여자 정보 */}
                        {post.frontmatter.people && post.frontmatter.people.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-center">
                              <div className="flex -space-x-1">
                                {post.frontmatter.people.slice(0, 4).map((person, index) => {
                                  // 멤버 정보에서 해당 참여자 찾기
                                  const member = members.find(m => 
                                    m.frontmatter.name.toLowerCase() === person.name.toLowerCase()
                                  )
                                  
                                  // 멤버 정보가 있으면 멤버의 photo 사용, 없으면 기존 photo 사용
                                  const imagePath = member?.frontmatter.photo 
                                    ? `/images/members/${member.frontmatter.photo}`
                                    : person.photo || "/images/profile-pic.png"
                                  
                                  return (
                                    <div key={index} className="relative group">
                                      <img
                                        src={imagePath}
                                        alt={person.name}
                                        className="w-6 h-6 rounded-full border border-white object-cover shadow-sm transition-transform duration-200"
                                        title={person.name}
                                        onError={(e) => {
                                          e.target.src = "/images/profile-pic.png"
                                        }}
                                      />
                                      {/* 툴팁 */}
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                        {person.name}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                                      </div>
                                    </div>
                                  )
                                })}
                                {post.frontmatter.people.length > 4 && (
                                  <div className="w-6 h-6 rounded-full bg-gray-300 border border-white flex items-center justify-center shadow-sm">
                                    <span className="text-xs text-gray-600 font-medium">
                                      +{post.frontmatter.people.length - 4}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
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
      </Layout>
    </>
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
          tags
          people {
            name
            affiliation
            photo
            homepage
          }
        }
      }
    }
    allMembers: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/members/" } }
      sort: { frontmatter: { name: ASC } }
    ) {
      nodes {
        frontmatter {
          name
          photo
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

export const Head = () => <Seo title="HAI LAB" />
