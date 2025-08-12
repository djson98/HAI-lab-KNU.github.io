import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { MdEmail } from "react-icons/md"
import { SiGooglescholar } from "react-icons/si"
import { FaHome } from "react-icons/fa"

type DataProps = {
  allMarkdownRemark: {
    nodes: {
      id: string
      html: string
      frontmatter: {
        name: string
        position: string
        email: string
        homepage: string
        googleScholar: string
        graduation: string
        current: string
      }
    }[]
  }
}

const MembersPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const members = data.allMarkdownRemark.nodes

  // 직급별로 그룹화 (박사와 석사를 하나의 그룹으로)
  const groupedMembers = members.reduce((groups: { [key: string]: any[] }, member) => {
    let groupKey = member.frontmatter.position
    
    // 박사와 석사를 'Graduate Student' 그룹으로 통합
    if (member.frontmatter.position === 'Ph.D Student' || member.frontmatter.position === 'M.S Student') {
      groupKey = 'Graduate Student'
    }
    
    // Alumni는 별도 그룹으로 유지
    if (member.frontmatter.position === 'Alumni') {
      groupKey = 'Alumni'
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(member)
    return groups
  }, {})

  // 직급 순서 정의
  const positionOrder = {
    'Professor': 1,
    'Graduate Student': 2,
    'Undergraudate Student': 3,
    'Alumni': 4
  }

  // 직급 순서대로 정렬
  const sortedPositions = Object.keys(groupedMembers).sort((a, b) => {
    const orderA = positionOrder[a] || 999
    const orderB = positionOrder[b] || 999
    return orderA - orderB
  })

  // Graduate Student 그룹 내에서 박사생을 먼저 정렬
  Object.keys(groupedMembers).forEach(groupKey => {
    if (groupKey === 'Graduate Student') {
      groupedMembers[groupKey].sort((a, b) => {
        if (a.frontmatter.position === 'Ph.D Student' && b.frontmatter.position === 'M.S Student') return -1
        if (a.frontmatter.position === 'M.S Student' && b.frontmatter.position === 'Ph.D Student') return 1
        return 0
      })
    }
  })

  return (
    <Layout activeLink="People">
      <div className="space-y-10">
        {sortedPositions.map((position) => (
          <div key={position} className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-4 font-sans tracking-wide">
              {position === 'Professor' ? 'Director' : position}
            </h2>
                                                <div className="space-y-6">
                          {groupedMembers[position].map((member) => (
                            position === 'Alumni' ? (
                              // Alumni는 이름만 표시
                              <div key={member.id} className="py-2">
                                <span className="text-lg font-medium text-gray-900">
                                  {member.frontmatter.name}
                                </span>
                              </div>
                            ) : (
                              // 기존 멤버들은 원래 스타일 유지
                              <article key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
                                  {/* 상단/왼쪽: 멤버 사진 */}
                                  <div className="flex-shrink-0 w-full md:w-auto">
                                    <div className="w-full h-80 md:w-64 md:h-80 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                      {member.frontmatter.name === "Auk Kim" ? (
                                        <img
                                          src="/images/members/aukkim.jpeg"
                                          alt={member.frontmatter.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : member.frontmatter.name === "Jiwoo Hwang" ? (
                                        <img
                                          src="/images/members/jiwoohwang.jpeg"
                                          alt={member.frontmatter.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : member.frontmatter.name === "Jungmin Lee" ? (
                                        <img
                                          src="/images/members/jungminlee.png"
                                          alt={member.frontmatter.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : member.frontmatter.name === "Sunatullaev Golibjon" ? (
                                        <img
                                          src="/images/members/golibjon.png"
                                          alt={member.frontmatter.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : member.frontmatter.name === "Dongju Son" ? (
                                        <img
                                          src="/images/members/dongjuson.png"
                                          alt={member.frontmatter.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <img
                                          src="/images/profile-pic.png"
                                          alt={member.frontmatter.name}
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* 하단/오른쪽: 멤버 정보 */}
                                  <div className="flex-1 min-w-0 text-left">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                      {member.frontmatter.name}
                                    </h2>
                                    <p className="text-base md:text-lg text-blue-600 font-medium mb-4">
                                      {member.frontmatter.position}
                                    </p>
                                    <div 
                                      className="prose prose-gray max-w-none mb-4 text-sm md:text-base"
                                      dangerouslySetInnerHTML={{ __html: member.html }} 
                                    />
                                                                          <div className="space-y-3">
                                        {/* 이메일 아이콘과 주소 (SVG로 표시) - 먼저 표시 */}
                                        {member.frontmatter.email && (
                                          <div className="flex items-center space-x-2">
                                            <MdEmail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                            <a 
                                              href={`mailto:${member.frontmatter.email}`}
                                              className="inline-block"
                                              title="Click to send email"
                                            >
                                              <svg 
                                                className="h-5 w-auto" 
                                                viewBox="0 0 300 20" 
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <text 
                                                  x="0" 
                                                  y="15" 
                                                  fontFamily="system-ui, -apple-system, sans-serif" 
                                                  fontSize="14" 
                                                  fontWeight="500" 
                                                  fill="#6B7280"
                                                  className="select-none"
                                                >
                                                  {member.frontmatter.email.length > 35 ? 
                                                    member.frontmatter.email.substring(0, 35) + '...' : 
                                                    member.frontmatter.email
                                                  }
                                                </text>
                                              </svg>
                                            </a>
                                          </div>
                                        )}
                                        
                                        {/* 홈페이지와 Scholar 아이콘과 주소 (SVG로 표시) - 아래에 표시 */}
                                        <div className="space-y-3">
                                          {member.frontmatter.homepage && (
                                            <div className="flex items-center space-x-2">
                                              <FaHome className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                              <a 
                                                href={member.frontmatter.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block"
                                                title="Visit homepage"
                                              >
                                                                                              <svg 
                                                className="h-5 w-auto" 
                                                viewBox="0 0 300 20" 
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <text 
                                                  x="0" 
                                                  y="15" 
                                                  fontFamily="system-ui, -apple-system, sans-serif" 
                                                  fontSize="14" 
                                                  fontWeight="500" 
                                                  fill="#6B7280"
                                                  className="select-none"
                                                >
                                                  {member.frontmatter.homepage.length > 35 ? 
                                                    member.frontmatter.homepage.substring(0, 35) + '...' : 
                                                    member.frontmatter.homepage
                                                  }
                                                </text>
                                              </svg>
                                              </a>
                                            </div>
                                          )}
                                          
                                          {member.frontmatter.googleScholar && (
                                            <div className="flex items-center space-x-2">
                                              <SiGooglescholar className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                              <a 
                                                href={member.frontmatter.googleScholar}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block"
                                                title="View Google Scholar profile"
                                              >
                                                <svg 
                                                  className="h-5 w-auto" 
                                                  viewBox="0 0 300 20" 
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <text 
                                                    x="0" 
                                                    y="15" 
                                                    fontFamily="system-ui, -apple-system, sans-serif" 
                                                    fontSize="14" 
                                                    fontWeight="500" 
                                                    fill="#6B7280"
                                                    className="select-none"
                                                  >
                                                    {member.frontmatter.googleScholar.length > 35 ? 
                                                      member.frontmatter.googleScholar.substring(0, 35) + '...' : 
                                                      member.frontmatter.googleScholar
                                                    }
                                                  </text>
                                                </svg>
                                              </a>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                  </div>
                                </div>
                              </article>
                            )
                          ))}
                        </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/members/" } }
      sort: { frontmatter: { name: ASC } }
    ) {
      nodes {
        id
        html
        frontmatter {
          name
          position
          email
          homepage
          googleScholar
          graduation
          current
        }
      }
    }
  }
`

export default MembersPage