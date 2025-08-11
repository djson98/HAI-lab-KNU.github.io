import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { ReactNode, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { StaticImage } from "gatsby-plugin-image";
import { FaGithub } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SiResearchgate, SiGooglescholar } from "react-icons/si";
import { HiMenu, HiX } from "react-icons/hi";


type LayoutProps = {
  activeLink?: string;
  children: ReactNode;
};

const MENU = {
  Home: "/",
  People: "/members",
  Projects: "/blog",
  Publications: "/publications",
  Lectures: "/lectures",
  News: "/news",
};

const Layout = ({ activeLink = "Projects", children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    initFlowbite();
  }, []);

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          email
          github
          researchGate
          googleScholar
          location
        }
      }
    }
  `);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
              {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50" role="navigation" aria-label="Main navigation">
          <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
            <Link to="/" className="flex items-center mr-8 focus:outline-none rounded">
              <StaticImage
                src="../images/logo-hai.png"
                alt="HaiLab Logo - Return to homepage"
                width={228}
                height={50}
                className="h-12 w-auto"
                objectFit="contain"
              />
            </Link>
            
            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center space-x-1" role="menubar">
              {Object.entries(MENU).map(([name, path]) => (
                <Link
                  key={name}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-xs font-medium font-display transition-all duration-200 focus:outline-none ${
                    activeLink.toLowerCase() === name.toLowerCase()
                      ? "text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  role="menuitem"
                  aria-current={activeLink.toLowerCase() === name.toLowerCase() ? "page" : undefined}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* 햄버거 메뉴 버튼 (모바일) */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
              <div className="px-6 py-4 space-y-2">
                {Object.entries(MENU).map(([name, path]) => (
                  <Link
                    key={name}
                    to={path}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeLink.toLowerCase() === name.toLowerCase()
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={activeLink.toLowerCase() === name.toLowerCase() ? "page" : undefined}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

              {/* Content */}
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-16" id="main-content" role="main">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div className="max-w-xs">
              <div className="text-xs text-gray-400 whitespace-pre-line mb-2">
                Kangwon National University College of Engineering 6, Room 512<br />
                1 Gangwondaehakgil, Chuncheon-si, Gangwon-do (24341)<br />
                Republic of Korea
              </div>
              <span className="block text-xs text-gray-400">© 2025 Human-AI Interaction Lab</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;