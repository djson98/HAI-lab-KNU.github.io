/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Human-AI Interaction Lab`,
    author: {
      name: `Auk Kim`,
      summary: `Professor at Kangwon National University, specializing in Human-Computer Interaction and Ubiquitous Computing.`,
    },
    description: `Human-AI Interaction Lab at Kangwon National University. Research in HCI, Ubiquitous Computing, Machine Learning & Mobile Sensing.`,
    siteUrl: `https://hailab.kangwon.ac.kr/`,
    social: {
      twitter: `aukkim`,
    },
    email: `kimauk@kangwon.ac.kr`,
    github: `https://github.com/aukkim`,
    researchGate: `https://www.researchgate.net/profile/Auk-Kim`,
    googleScholar: `https://scholar.google.com/citations?user=YOUR_GOOGLE_SCHOLAR_ID`,
    location: `Kangwon National University
College of Engineering 6, Room 512

1 Gangwondaehakgil, Chuncheon-si, Gangwon-do (24341)
Republic of Korea`,
  
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter\:300,400,500,600,700`,
          `Noto Sans KR\:300,400,500,600,700`,
          `Poppins\:300,400,500,600,700`,
          `Source Sans Pro\:300,400,500,600,700`
        ],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `members`,
        path: `${__dirname}/content/members`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `publications`,
        path: `${__dirname}/content/publications`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `lectures`,
        path: `${__dirname}/content/lectures`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/content/news`,
      },
    },


    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },



    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        // remark/rehype 플러그인도 여기 등록 가능
      },
    },
    
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Human-AI Interaction Lab`,
        short_name: `HaiLab`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3B82F6`,
        display: `minimal-ui`,
        icon: `src/images/logo-hai.png`,
      },
    },
  ],
}
