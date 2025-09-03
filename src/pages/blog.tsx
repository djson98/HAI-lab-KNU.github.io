import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

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
          tags?: string[]
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
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  // 사용 가능한 모든 태그 목록 생성
  const availableTags = React.useMemo(() => {
    const allTags = posts
      .filter(post => post.frontmatter.tags)
      .flatMap(post => post.frontmatter.tags || [])
    return [...new Set(allTags)].sort()
  }, [posts])

  // 선택된 태그에 따라 프로젝트 필터링 (AND 로직)
  const filteredPosts = React.useMemo(() => {
    if (selectedTags.length === 0) return posts
    return posts.filter(post => 
      post.frontmatter.tags && 
      selectedTags.every(tag => post.frontmatter.tags!.includes(tag))
    )
  }, [posts, selectedTags])

  // 태그 선택/해제 핸들러
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <Layout activeLink="Projects">
      <div className="space-y-8">
        {/* 태그 필터 */}
        {availableTags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-600 mb-2 text-center">Research Area</h3>
            <div className="flex flex-wrap justify-center gap-1">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-2 py-1 rounded-md font-medium transition-all duration-300 text-xs whitespace-nowrap ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-blue-600 border border-gray-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 구분선 */}
        <hr className="border-gray-200 opacity-50" />
        
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600">No projects yet.</p>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => {
              return (
                <article key={post.id} className="group bg-white hover:bg-gray-50 transition-all duration-300 border-b border-gray-200 py-4">
                  <Link to={post.fields.slug} className="block">
                    <div className="flex flex-col md:flex-row items-center">
                      {/* 왼쪽: 썸네일 이미지 */}
                      <div className="w-full md:w-1/4 h-32 md:h-24 overflow-hidden">
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
                    
                      {/* 오른쪽: 텍스트 내용 */}
                      <div className="w-full md:w-3/4 pl-4 md:pl-6">
                        <h2 className="text-lg font-normal text-gray-800 group-hover:text-blue-600 transition-all duration-300 leading-tight mb-2">
                          {post.frontmatter.title}
                        </h2>
                        {/* 프로젝트 참여자 표시 */}
                        {post.frontmatter.people && post.frontmatter.people.length > 0 && (
                          <p className="text-sm text-gray-600 mb-2">
                            {post.frontmatter.people.map((person, index) => (
                              <span key={index}>
                                {person.name}
                                {index < post.frontmatter.people.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </p>
                        )}
                        {/* 프로젝트 태그 표시 */}
                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.frontmatter.tags.map((tag, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
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
  }
`

export default BlogPage

export const Head = () => <Seo title="HAI LAB" /> 