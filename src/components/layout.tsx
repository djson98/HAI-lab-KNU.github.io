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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    initFlowbite();
    
    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 1); // 1px 이상 스크롤하면 페이지 제목 숨김
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-white overflow-x-hidden">
              {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50 transition-all duration-300" role="navigation" aria-label="Main navigation">
          <div className="max-w-4xl mx-auto flex justify-between items-center px-4 md:px-6 py-2 md:py-4">
            <Link to="/" className="flex items-center mr-4 md:mr-8 focus:outline-none rounded">
              <img
                src="/images/logo-hai.png"
                alt="HaiLab Logo - Return to homepage"
                width={228}
                height={50}
                className="h-8 md:h-12 w-auto"
              />
            </Link>
            
            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center space-x-1" role="menubar">
              {Object.entries(MENU).map(([name, path]) => (
                <Link
                  key={name}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-base font-medium font-display focus:outline-none ${
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
              className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* 현재 페이지 제목 표시 (부드러운 애니메이션으로 나타나고 사라짐) */}
          <div 
            className={`md:hidden bg-white/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
              isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-20 opacity-100 py-3'
            }`}
          >
            <div className="text-center px-4">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {activeLink}
              </h1>
            </div>
          </div>

          {/* 모바일 메뉴 */}
          <div 
            className={`md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 md:px-6 py-3 md:py-4 space-y-1 md:space-y-2">
              {Object.entries(MENU).map(([name, path]) => (
                <Link
                  key={name}
                  to={path}
                  className={`block px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm font-medium ${
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
        </nav>

              {/* Content */}
        <main 
          className={`max-w-4xl mx-auto px-4 md:px-6 pb-16 transition-all duration-300 ease-in-out ${
            isScrolled ? 'pt-20 md:pt-24' : 'pt-32 md:pt-36'
          }`} 
          id="main-content" 
          role="main"
        >
          {children}
        </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* 왼쪽: 주소 및 저작권 정보 */}
            <div className="text-sm text-gray-500">
              <div className="max-w-2xl">
                <div className="text-xs text-gray-400 whitespace-pre-line mb-2">
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
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;