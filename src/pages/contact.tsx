import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => {
  return (
    <Layout activeLink="Contact">
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Google Maps 섹션 */}
          <div className="w-full max-w-6xl mx-auto mb-12">
            <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.674111118664!2d127.73666439999999!3d37.867763599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e9c8c8c8c8c8%3A0x8c8c8c8c8c8c8c8!2z6rCV7JuQ64yA7ZWZ6rWQIOqzte2VmTbtmLjqtIA!5e0!3m2!1sko!2skr!4v1755483537137"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Human-AI Interaction Lab Location"
                aria-label="Kangwon National University College of Engineering 6 Location Map"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Kangwon National University College of Engineering 6, Room 512
              </p>
            </div>
          </div>

          {/* 연락처 정보 섹션 */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-sm border border-blue-200">
              <div className="space-y-6">
                {/* 이메일 */}
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <a 
                      href="mailto:kimauk@hai.kangwon.ac.kr"
                      className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      kimauk@hai.kangwon.ac.kr
                    </a>
                  </div>
                </div>
                
                {/* 위치 */}
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-lg font-medium text-gray-900">
                      Room 512, College of Engineering 6
                    </p>
                  </div>
                </div>

                {/* 주소 */}
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="text-lg font-medium text-gray-900">
                      Kangwon National University College of Engineering 6, Room 512<br />
                      1 Gangwondaehakgil, Chuncheon-si, Gangwon-do (24341)<br />
                      Republic of Korea
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage

 