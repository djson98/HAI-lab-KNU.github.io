import * as React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { MdEmail } from "react-icons/md"
import { SiGooglescholar } from "react-icons/si"
import { FaHome } from "react-icons/fa"
import Seo from "../components/seo"

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

  // 직급별로 그룹화
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
        {sortedPositions.map((position, index) => (
          <div key={position} id={position.toLowerCase().replace(/\s+/g, '-')}>
            {index > 0 && (
              <div className="border-t border-gray-200 my-8"></div>
            )}
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-normal text-gray-600 font-sans tracking-wide text-left">
                {position === 'Professor' ? 'Director' : position}
              </h2>
              
              {/* 그리드 레이아웃으로 멤버 표시 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {groupedMembers[position].map((member) => (
                  <div key={member.id} className="bg-white rounded-lg p-4 text-center hover:bg-gray-50 transition-colors duration-200">
                    {/* 멤버 사진 */}
                    <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                      {member.frontmatter.name === "Auk Kim" ? (
                        <img
                          src="/images/members/aukkim.jpeg"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover object-center"
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
                      ) : member.frontmatter.name === "Younghwan Kim" ? (
                        <img
                          src="/images/김영환.png"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Yeongju Mun" ? (
                        <img
                          src="/images/문영주.jpg"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Seongeun Lee" ? (
                        <img
                          src="/images/이성은.png"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Kyoyoung Choi" ? (
                        <img
                          src="/images/최교영.jpg"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Ji Wook Lee" ? (
                        <img
                          src="/images/이지욱_2.jpg"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Min Gyu Han" ? (
                        <img
                          src="/images/한민규.jpeg"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Min Ji Kim" ? (
                        <img
                          src="/images/김민지_3.JPG"
                          alt={member.frontmatter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.frontmatter.name === "Min Young Kim" ? (
                        <img
                          src="/images/김민영.jpg"
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
                    
                    {/* 멤버 이름 */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {member.frontmatter.name === "Ji Wook Lee" ? "Jiwook Lee" :
                       member.frontmatter.name === "Min Gyu Han" ? "Mingyu Han" :
                       member.frontmatter.name === "Min Ji Kim" ? "Minji Kim" :
                       member.frontmatter.name === "Min Young Kim" ? "Minyoung Kim" :
                       member.frontmatter.name}
                    </h3>
                    
                    {/* 직급 */}
                    <p className="text-sm text-blue-600 font-medium mb-3">
                      {member.frontmatter.position === 'Alumni' && member.frontmatter.graduation 
                        ? member.frontmatter.graduation 
                        : member.frontmatter.position}
                    </p>
                    
                    {/* 연구 분야 (HTML에서 추출) */}
                    {member.html && (
                      <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                        <div dangerouslySetInnerHTML={{ __html: member.html }} />
                      </div>
                    )}
                    
                    {/* 연락처 정보 */}
                    <div className="flex items-center justify-center space-x-2">
                      {/* 이메일 */}
                      {member.frontmatter.email && (
                        <a 
                          href={`mailto:${member.frontmatter.email}`}
                          className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          title={`Send email to ${member.frontmatter.email}`}
                        >
                          <MdEmail className="w-3 h-3 text-white" />
                        </a>
                      )}
                      
                      {/* 홈페이지 */}
                      {member.frontmatter.homepage && (
                        <a 
                          href={member.frontmatter.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          title="Visit homepage"
                        >
                          <FaHome className="w-3 h-3 text-white" />
                        </a>
                      )}
                      
                      {/* Google Scholar */}
                      {member.frontmatter.googleScholar && (
                        <a 
                          href={member.frontmatter.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          title="View Google Scholar profile"
                        >
                          <SiGooglescholar className="w-3 h-3 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
        }
      }
    }
  }
`

export default MembersPage

export const Head = () => <Seo title="HAI LAB" />