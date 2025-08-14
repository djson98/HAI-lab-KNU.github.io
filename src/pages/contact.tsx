import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = () => {
  return (
    <Layout activeLink="Contact">
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* 페이지 제목 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Human-AI Interaction Lab에 연락하거나 방문하고 싶으시면 아래 정보를 참고해 주세요.
            </p>
          </div>

          {/* Google Maps 섹션 */}
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              위치
            </h2>
            <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1654.2810374428593!2d127.73707708307613!3d37.86753983453648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sko!2skr!4v1755157690862!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Human-AI Interaction Lab 위치"
                aria-label="강원대학교 한빛관 위치 지도"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                강원대학교 한빛관 (Kangwon National University Hanbit Hall)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage

 