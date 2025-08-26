import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import YearFilter from "../components/YearFilter"
import Seo from "../components/seo"

type DataProps = {
  allMarkdownRemark: {
    nodes: {
      id: string
      excerpt: string
      frontmatter: {
        title: string
        date: string
        description: string
        type: string
        period: string
        major: boolean
      }
    }[]
  }
}

const LecturesPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const lectures = data.allMarkdownRemark.nodes
  const [selectedType, setSelectedType] = React.useState("All")
  const [startYear, setStartYear] = React.useState("")
  const [endYear, setEndYear] = React.useState("")

  // 사용 가능한 타입들
  const availableTypes = ["All", "Major", "Liberal Arts"]

  // 사용 가능한 연도들 (2020-2025)
  const availableYears = Array.from({ length: 6 }, (_, i) => (2025 - i).toString())

  // 타입별로 강의 분류
  const getTypeFromMajor = (major: boolean) => {
    return major ? "Major" : "Liberal Arts"
  }

  // 필터링된 강의들
  const filteredLectures = lectures.filter((lecture) => {
    const lectureType = getTypeFromMajor(lecture.frontmatter.major)
    const lectureYear = new Date(lecture.frontmatter.date).getFullYear().toString()
    
    const typeMatch = selectedType === "All" || lectureType === selectedType
    const yearMatch = (!startYear || lectureYear >= startYear) && (!endYear || lectureYear <= endYear)
    
    return typeMatch && yearMatch
  })

  // 전공 강의를 먼저, 그 다음에 일반 강의를 정렬
  const sortedLectures = [...filteredLectures].sort((a, b) => {
    if (a.frontmatter.major && !b.frontmatter.major) return -1
    if (!a.frontmatter.major && b.frontmatter.major) return 1
    return 0
  })

  return (
    <Layout activeLink="Lectures">
      <div className="space-y-8">
        {/* 필터 컴포넌트 */}
        <YearFilter
          startYear={startYear}
          endYear={endYear}
          onStartYearChange={setStartYear}
          onEndYearChange={setEndYear}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          availableTypes={availableTypes}
          availableYears={availableYears}
        />



        {sortedLectures.length === 0 ? (
          <p className="text-gray-600 text-center">No lectures match the selected filters.</p>
        ) : (
          <div className="space-y-24">
            {sortedLectures.map((lecture) => (
              <div key={lecture.id} className="border-b border-gray-100 pb-16">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {lecture.frontmatter.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {lecture.frontmatter.description || lecture.excerpt}
                </p>
                <div className="flex items-start space-x-4">
                  {lecture.frontmatter.major === true && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      Major
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {lecture.frontmatter.period}
                  </span>
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
      filter: { fileAbsolutePath: { regex: "/content/lectures/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          type
          period
          major
        }
      }
    }
  }
`

export default LecturesPage

export const Head = () => <Seo title="HAI LAB" /> 