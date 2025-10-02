import * as React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { ReactNode, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
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
  // Contact: "/contact", // Hidden for now
  // News: "/news", // Hidden for now, will be developed later
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
        }
      }
    }
  `);

  return (
    <div className="min-h-screen bg-white">
              {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300" role="navigation" aria-label="Main navigation">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-12 py-3 md:py-5">
            <Link to="/" className="flex items-center mr-6 md:mr-12 focus:outline-none rounded">
              <img 
                src="/images/logo-hai-crop.png" 
                alt="HAI Lab Logo" 
                className="h-6 md:h-8 w-auto mr-2"
              />
              <span className="text-sm md:text-base font-light text-gray-900 hover:text-blue-600 transition-colors duration-300 whitespace-nowrap overflow-hidden">
                Human-AI Interaction Lab.
              </span>
            </Link>
            
            {/* 데스크톱 메뉴 */}
            <div className="hidden lg:flex items-center space-x-4" role="menubar">
              {Object.entries(MENU).map(([name, path]) => (
                <Link
                  key={name}
                  to={path}
                  className={`px-6 py-3 rounded-lg text-lg font-light focus:outline-none transition-colors duration-300 ${
                    activeLink.toLowerCase() === name.toLowerCase()
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
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
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
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
          <div 
            className={`lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 md:px-6 py-3 md:py-4 space-y-1 md:space-y-2">
              {Object.entries(MENU).map(([name, path]) => (
                <Link
                  key={name}
                  to={path}
                  className={`block px-3 md:px-4 py-2 md:py-3 rounded-lg text-base font-light transition-colors duration-300 ${
                    activeLink.toLowerCase() === name.toLowerCase()
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600"
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
        </nav>

              {/* Content */}
        <main 
          className="w-full max-w-7xl mx-auto px-3 md:px-8 pb-16 pt-20 md:pt-24" 
          id="main-content" 
          role="main"
        >
          {children}
        </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-3 md:px-8">
          <div className="flex justify-between items-center">
            {/* 왼쪽: 주소 및 저작권 정보 */}
            <div className="text-xs md:text-sm text-gray-500">
              <div className="max-w-2xl">
                <div className="text-xs text-gray-400 whitespace-pre-line mb-1 md:mb-2">
                  Kangwon National University College of Engineering 6, Room 512<br />
                  1, Gangwondaehakgil, Chuncheon-si, Gangwon-do (24341)
                </div>
                <span className="block text-xs text-gray-400">© 2025 Human-AI Interaction Lab</span>
              </div>
            </div>
            
            {/* 오른쪽: KNU 로고 */}
            <div className="flex-shrink-0">
              <img
                src="/images/knu-logo.webp"
                alt="Kangwon National University Logo"
                className="h-8 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;