import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"

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

  // 전공 강의를 먼저, 그 다음에 일반 강의를 정렬
  const sortedLectures = [...lectures].sort((a, b) => {
    if (a.frontmatter.major && !b.frontmatter.major) return -1
    if (!a.frontmatter.major && b.frontmatter.major) return 1
    return 0
  })

  return (
    <Layout activeLink="Lectures">
      <div className="space-y-8">
        {sortedLectures.length === 0 ? (
          <p className="text-gray-600">No lectures available yet.</p>
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