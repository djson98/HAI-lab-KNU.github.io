import * as React from "react"
import { graphql, PageProps, Link } from "gatsby"
import Layout from "../components/layout"
import YearFilter from "../components/YearFilter"
import { FaTrophy } from "react-icons/fa"

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

  // 사용 가능한 연도 목록 생성 (최신순)
  const availableYears = React.useMemo(() => {
    const years = [...new Set(publications.map(pub => pub.frontmatter.year))].sort((a, b) => parseInt(b) - parseInt(a))
    return years
  }, [publications])

  // 사용 가능한 타입 목록 생성
  const availableTypes = React.useMemo(() => {
    const types = ["All", ...new Set(publications.map(pub => pub.frontmatter.type))].filter(type => type)
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
      <div className="space-y-8">
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
          <p className="text-gray-600">선택한 연도 범위에 해당하는 논문이 없습니다.</p>
        ) : (
          <div className="space-y-8">
            {sortedYears.map((year) => (
              <div key={year} className="space-y-1">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">{year}</h2>
                <div className="space-y-0">
                  {groupedPublications[year].map((pub) => (
                    <article key={pub.id} className="bg-white border-b border-gray-200 py-4">
                      <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {pub.frontmatter.title}
                        </h2>
                        
                        <div className="text-xs text-gray-600">
                          <p className="mb-1">{pub.frontmatter.authors}</p>
                          <p className="italic mb-2">{pub.frontmatter.journal}, {pub.frontmatter.year}</p>
                          
                          {/* 수상 배지 */}
                          {pub.frontmatter.award && (
                            <div className="mb-2">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 shadow-sm border border-amber-200">
                                <FaTrophy className="w-4 h-4 mr-1 text-amber-600" />
                                {pub.frontmatter.award}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-4">
                          {pub.frontmatter.paper && (
                            <a 
                              href={pub.frontmatter.paper}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-xs font-medium bg-sky-100 text-sky-700 rounded-md shadow-sm hover:bg-sky-200 hover:shadow-md transition-all duration-200"
                            >
                              paper
                            </a>
                          )}
                          {pub.frontmatter.slide && (
                            <a 
                              href={pub.frontmatter.slide}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-md shadow-sm hover:bg-orange-200 hover:shadow-md transition-all duration-200"
                            >
                              slide
                            </a>
                          )}
                          {pub.frontmatter.video && (
                            <a 
                              href={pub.frontmatter.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-md shadow-sm hover:bg-yellow-200 hover:shadow-md transition-all duration-200"
                            >
                              video
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
        }
      }
    }
  }
`

export default PublicationsPage 