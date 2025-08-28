import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import Layout from "../components/layout"
import YearFilter from "../components/YearFilter"
import { FaTrophy, FaFilePdf, FaPlay } from "react-icons/fa"
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
        authors: string
        journal: string
        type: string
        year: string
        doi: string
        abstract: string
        paper: string
        slide: string
        video: string
        award?: string
      }
    }[]
  }
}

const PublicationsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const publications = data.allMarkdownRemark.nodes
  const [startYear, setStartYear] = React.useState<string>("")
  const [endYear, setEndYear] = React.useState<string>("")
  const [selectedType, setSelectedType] = React.useState<string>("All")
  const [activeSection, setActiveSection] = React.useState<string>("")

  // 현재 보이는 섹션을 추적하는 함수
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px' // 네비게이션 바를 고려한 여백
      }
    )

    // 모든 섹션을 관찰
    const sections = document.querySelectorAll('div[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // 사용 가능한 연도 목록 생성 (최신순)
  const availableYears = React.useMemo(() => {
    const years = [...new Set(publications.map(pub => pub.frontmatter.year))].sort((a, b) => parseInt(b) - parseInt(a))
    return years
  }, [publications])

  // 사용 가능한 타입 목록 생성
  const availableTypes = React.useMemo(() => {
    const types = ["All", "Journal", "Conference", "Poster"]
    return types
  }, [publications])

  // 필터링된 논문 목록
  const filteredPublications = React.useMemo(() => {
    return publications.filter(pub => {
      const year = parseInt(pub.frontmatter.year)
      const start = startYear ? parseInt(startYear) : 0
      const end = endYear ? parseInt(endYear) : 9999
      const typeMatch = selectedType === "All" || pub.frontmatter.type === selectedType
      return year >= start && year <= end && typeMatch
    })
  }, [publications, startYear, endYear, selectedType])

  // 연도별로 그룹화하고 최신순으로 정렬
  const groupedPublications = React.useMemo(() => {
    return filteredPublications.reduce((groups: { [key: string]: any[] }, pub) => {
      const year = pub.frontmatter.year
      if (!groups[year]) {
        groups[year] = []
      }
      groups[year].push(pub)
      return groups
    }, {})
  }, [filteredPublications])

  // 연도를 내림차순으로 정렬 (최신 연도가 먼저)
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <Layout activeLink="Publications">
      <div className="flex max-w-7xl mx-auto px-6 md:px-8 py-8">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 space-y-8">
        {/* 연도 필터 */}
        <YearFilter
          startYear={startYear}
          endYear={endYear}
          selectedType={selectedType}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          onTypeChange={setSelectedType}
          availableYears={availableYears}
          availableTypes={availableTypes}
        />

        {filteredPublications.length === 0 ? (
          <p className="text-gray-600">No publications found for the selected filters.</p>
        ) : (
          <div className="space-y-8">
            {sortedYears.map((year) => (
              <div key={year} id={year} className="space-y-1">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">{year}</h2>
                <div className="space-y-6">
                  {groupedPublications[year].map((pub) => (
                    <article key={pub.id} className="bg-white rounded-lg p-6 shadow-sm hover:bg-gray-50 transition-colors duration-200">
                      <div className="space-y-2">
                        {pub.frontmatter.doi ? (
                          <a
                            href={pub.frontmatter.doi.startsWith('http') ? pub.frontmatter.doi : `https://doi.org/${pub.frontmatter.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                              {pub.frontmatter.title}
                            </h2>
                          </a>
                        ) : (
                          <h2 className="text-lg font-semibold text-gray-900">
                            {pub.frontmatter.title}
                          </h2>
                        )}
                        
                        <div className="text-xs text-gray-600">
                          <div className="mb-1 flex items-center gap-2">
                            <span>{pub.frontmatter.authors}</span>
                            {/* 수상 배지를 저자 이름 옆에 표시 */}
                            {pub.frontmatter.award && (
                              <span className="inline-flex items-center text-xs font-semibold text-orange-600">
                                <FaTrophy className="w-3 h-3 mr-1" />
                                {pub.frontmatter.award}
                              </span>
                            )}
                          </div>
                          <p className="mb-2">
                            {pub.frontmatter.tags && pub.frontmatter.tags.includes('Top Conference') ? (
                              <span>{pub.frontmatter.journal} (<span className="font-bold text-yellow-600">Top Conference</span>)</span>
                            ) : pub.frontmatter.journal && (
                              pub.frontmatter.journal.includes('International Journal of Human-Computer Studies') ||
                              pub.frontmatter.journal.includes('Computers & Education') ||
                              pub.frontmatter.journal.includes('Computers in Human Behavior')
                            ) ? (
                              <span>{pub.frontmatter.journal} (<span className="font-bold text-yellow-600">JCR 7%</span>)</span>
                            ) : (
                              <span>{pub.frontmatter.journal}</span>
                            )}, {pub.frontmatter.year}
                          </p>
                        </div>
                        
                        <div className="flex space-x-4">
                          {pub.frontmatter.paper && (
                            <a 
                              href={pub.frontmatter.paper}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-medium rounded-md hover:bg-rose-100 hover:border-rose-300 transition-all duration-200"
                            >
                              <FaFilePdf className="mr-1 w-2.5 h-2.5" />
                              PDF
                            </a>
                          )}
                          {pub.frontmatter.slide && (
                            <a 
                              href={pub.frontmatter.slide}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-medium rounded-md hover:bg-amber-100 hover:border-amber-300 transition-all duration-200"
                            >
                              slide
                            </a>
                          )}
                          {pub.frontmatter.video && (
                            <a 
                              href={pub.frontmatter.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 bg-sky-50 text-sky-600 border border-sky-200 text-xs font-medium rounded-md hover:bg-sky-100 hover:border-sky-300 transition-all duration-200"
                            >
                              <FaPlay className="mr-1 w-2.5 h-2.5" />
                              Video
                            </a>
                          )}

                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>

        {/* 오른쪽 스티키 인덱스 */}
        <div className="hidden lg:block w-32 ml-2 flex-shrink-0" style={{ position: 'relative', minHeight: '200vh' }}>
          <div 
            className="sticky-index sticky space-y-3 z-30" 
            style={{ 
              position: 'sticky', 
              top: '16rem'
            }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                Index
              </h4>
              <nav className="space-y-2">
                {sortedYears.map((year) => (
                  <a
                    key={year}
                    href={`#${year}`}
                    className={`block text-sm py-1 px-2 rounded transition-colors duration-200 whitespace-nowrap ${
                      activeSection === year 
                        ? 'text-blue-700 font-medium' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {year}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/publications/" } }
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
          authors
          journal
          type
          year
          doi
          abstract
          paper
          slide
          video
          award
          tags
        }
      }
    }
  }
`

export default PublicationsPage

export const Head = () => <Seo title="HAI LAB" /> 