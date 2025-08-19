# HAI Lab Website

Human-AI Interaction Lab의 공식 웹사이트입니다.

## 🚀 기술 스택

### **Frontend Framework**
- **Gatsby.js** - 정적 사이트 생성기
- **React** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성을 위한 JavaScript 확장

### **스타일링**
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **CSS Modules** - 컴포넌트별 스타일 격리
- **PostCSS** - CSS 전처리기

### **콘텐츠 관리**
- **Markdown** - 블로그 포스트 및 콘텐츠 작성
- **gatsby-source-filesystem** - 로컬 파일 시스템에서 콘텐츠 소싱
- **gatsby-transformer-remark** - Markdown 파일 변환

### **SEO & 메타데이터**
- **gatsby-plugin-react-helmet** - 문서 헤드 관리
- **gatsby-plugin-sitemap** - 사이트맵 자동 생성
- **gatsby-plugin-robots-txt** - robots.txt 자동 생성

### **이미지 최적화**
- **gatsby-plugin-image** - Gatsby 이미지 최적화
- **StaticImage** - 정적 이미지 컴포넌트

### **개발 도구**
- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포맷팅
- **Flowbite** - UI 컴포넌트 라이브러리

### **아이콘**
- **React Icons** - 다양한 아이콘 세트 (FaGithub, MdOutlineAlternateEmail, SiResearchgate, SiGooglescholar, HiMenu, HiX)

### **배포**
- **GitHub Pages** - 정적 웹사이트 호스팅
- **GitHub Actions** - 자동 배포 CI/CD

## 📁 프로젝트 구조

```
gatsby-starter-blog/
├── content/                 # 콘텐츠 파일들
│   ├── blog/               # 프로젝트 블로그 포스트
│   ├── lectures/           # 강의 정보
│   ├── members/            # 연구실 멤버 정보
│   ├── news/               # 뉴스 및 소식
│   └── publications/       # 논문 및 출판물
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   ├── contexts/           # React Context
│   ├── images/             # 이미지 파일들
│   ├── pages/              # 페이지 컴포넌트
│   ├── styles/             # 전역 스타일
│   └── templates/          # 페이지 템플릿
├── static/                 # 정적 파일들
│   ├── images/             # 정적 이미지
│   ├── paper/              # PDF 논문들
│   ├── robots.txt          # 검색 엔진 크롤러 지침
│   └── sitemap.xml         # 사이트맵
└── gatsby-config.js        # Gatsby 설정 파일
```

## 🎯 주요 기능

### **반응형 디자인**
- 모바일, 태블릿, 데스크톱에 최적화된 레이아웃
- Tailwind CSS의 반응형 클래스 활용
- 터치 친화적인 모바일 네비게이션

### **콘텐츠 필터링**
- 연도별 필터링 (Publications, Lectures)
- 타입별 필터링 (Journal, Conference, Patent)
- 실시간 검색 결과 업데이트

### **SEO 최적화**
- 메타 태그 자동 생성
- 구조화된 데이터 지원
- 사이트맵 및 robots.txt 자동 생성

### **이미지 최적화**
- 다양한 이미지 레이아웃 지원
  - 단일 이미지 (thumbnail)
  - 2개 이미지 (좌우 배치 또는 상하 배치)
  - 3개 이미지 (상하 배치)
  - 4개 이미지 (2x2 그리드)
- 이미지 호버 효과 및 애니메이션

## 🛠️ 설치 및 실행

### **필수 요구사항**
- Node.js 16.0.0 이상
- npm 또는 yarn

### **설치**
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run develop

# 프로덕션 빌드
npm run build

# 정적 파일 서빙
npm run serve
```

### **환경 설정**
1. `.env` 파일 생성 (필요시)
2. `gatsby-config.js`에서 사이트 메타데이터 수정
3. `content/` 폴더에 콘텐츠 추가

## 📱 반응형 브레이크포인트

- **모바일**: `< 768px` (md:)
- **태블릿**: `768px - 1024px` (lg:)
- **데스크톱**: `> 1024px` (xl:)

## 🎨 커스터마이징

### **테마 색상**
- **Primary**: Blue (#2563eb, #3b82f6)
- **Secondary**: Cyan (#06b6d4)
- **Neutral**: Gray (#6b7280, #9ca3af)

### **폰트**
- **Heading**: Inter, system-ui
- **Body**: system-ui, -apple-system, sans-serif

### **애니메이션**
- **Duration**: 200ms, 300ms
- **Easing**: ease-in-out
- **Hover Effects**: scale, shadow, color transitions

## 🚀 배포

### **GitHub Pages 배포**
1. `gatsby-config.js`에서 `pathPrefix` 설정
2. GitHub Actions 워크플로우 설정
3. `gh-pages` 브랜치에 자동 배포

### **빌드 최적화**
- 이미지 최적화 및 WebP 변환
- CSS/JS 번들 최소화
- 정적 파일 압축

## 📊 성능 최적화

- **Code Splitting**: 페이지별 코드 분할
- **Image Optimization**: WebP, AVIF 포맷 지원
- **Lazy Loading**: 이미지 지연 로딩
- **Preloading**: 중요 리소스 사전 로딩

## 🔧 개발 팁

### **새 콘텐츠 추가**
1. `content/` 폴더에 Markdown 파일 생성
2. frontmatter에 메타데이터 추가
3. 이미지는 `static/images/`에 배치
4. Gatsby 개발 서버 재시작

### **컴포넌트 개발**
- TypeScript 사용 권장
- Tailwind CSS 클래스 활용
- 반응형 디자인 고려
- 접근성(accessibility) 준수

## 📝 Content Update Guide

### **Adding New Projects**

#### 1. Create New Project Blog Post
```bash
# Create new folder in content/blog/
mkdir content/blog/project-name
```

#### 2. Create index.md file
```markdown
---
title: "Project Title"
date: "YYYY-MM-DD"
description: "Project description"

# Images (Optional)
thumbnail: "/images/project-image.png"
image1: "/images/image1.png"
image2: "/images/image2.png"

# Publication information
publications:
  - title: "Paper Title"
    authors: "Author1, Author2, Author3"
    venue: "Journal Name, Year"
    pdf: "/paper/paper-file.pdf"
    doi: "10.xxxx/xxxxx"  # If DOI exists
    video: "https://youtube.com/..."  # If video exists

# Dataset information
datasets:
  - title: "Dataset Name"
    description: "Dataset description"
    zenodo: "https://zenodo.org/..."
    size: "Size"
    license: "License"

# Source code information
sourcecode:
  - title: "Code Name"
    description: "Code description"
    github: "https://github.com/..."
    language: "Python"
    framework: "Framework name"

# Research team information
people:
  - name: "Name"
    affiliation: "Affiliation"
    photo: "/images/members/photo.jpg"
    homepage: "https://..."
---
```

### **Adding New Publications**

#### 1. Create new file in Publications folder
```bash
# Create new file in content/publications/
touch content/publications/paper-name.md
```

#### 2. Write publication information
```markdown
---
title: "Paper Title"
authors: "Author1, Author2, Author3"
journal: "Journal Name"
type: "Journal"  # Journal, Conference, Poster
year: "2024"
date: "2024-01-01"
doi: "10.xxxx/xxxxx"  # DOI link
paper: "/paper/paper-file.pdf"
slide: "/slides/slides.pdf"  # Optional
video: "https://youtube.com/..."  # Optional
tags: ["Top Conference"]  # If it's a top conference
award: "Award Name"  # If awarded
---
```

### **Adding Course Information**

#### 1. Create new file in Lectures folder
```bash
# Create new file in content/lectures/
touch content/lectures/course-name.md
```

#### 2. Write course information
```markdown
---
title: "Course Title"
semester: "2024-1"
description: "Course description"
instructor: "Instructor Name"
credits: "3"
schedule: "Tue Thu 10:30-11:45"
location: "Classroom"
syllabus: "/files/syllabus.pdf"
---
```

### **Adding Lab Members**

#### 1. Create new file in Members folder
```bash
# Create new file in content/members/
touch content/members/member-name.md
```

#### 2. Write member information
```markdown
---
name: "Name"
role: "Student"  # Professor, Postdoc, PhD, Master, Undergraduate
affiliation: "Affiliation"
email: "email@example.com"
photo: "/images/members/photo.jpg"
homepage: "https://..."
github: "https://github.com/..."
research_interests: ["Research Area 1", "Research Area 2"]
---
```

### **Adding News**

#### 1. Create new file in News folder
```bash
# Create new file in content/news/
touch content/news/news-title.md
```

#### 2. Write news information
```markdown
---
title: "News Title"
date: "2024-01-01"
description: "News summary"
content: "News content"
image: "/images/news/news-image.jpg"
---
```

### **Adding Images**

#### 1. Place image files
```bash
# Project images
cp image-file.jpg static/images/

# Member photos
cp member-photo.jpg static/images/members/

# Paper PDFs
cp paper.pdf static/paper/
```

#### 2. Image usage
```markdown
# Thumbnail
thumbnail: "/images/image-name.jpg"

# Single image
image1: "/images/image1.jpg"

# Multiple images
image1: "/images/image1.jpg"
image2: "/images/image2.jpg"
image3: "/images/image3.jpg"
```

### **After Update Checklist**

1. **Restart Gatsby development server**
```bash
npm run develop
```

2. **Verify content displays correctly**
   - Check if new content appears in menus
   - Verify images load properly
   - Confirm links work correctly

3. **Commit and push changes**
```bash
git add .
git commit -m "feat: add new content"
git push
```

### **Important Notes**

- **Filenames**: Use only English, numbers, and hyphens (-). Avoid Korean, spaces, and special characters
- **Image formats**: JPG, PNG, GIF supported
- **PDF size**: Avoid uploading extremely large files
- **DOI links**: Enter accurate DOI for paper title click navigation
- **Metadata**: Fill in all frontmatter fields correctly

### **File Naming Convention**

- **Projects**: `project-name` (e.g., `ai-complaint-classification`)
- **Publications**: `Paper-Title-With-Hyphens.md` (e.g., `Interrupting-for-Microlearning.md`)
- **Members**: `member-name.md` (e.g., `aukkim.md`)
- **Images**: `image-name.jpg` (e.g., `smart-speaker.png`)

### **Common Issues & Solutions**

- **Content not appearing**: Check frontmatter syntax and restart dev server
- **Images not loading**: Verify file path and image format
- **Links not working**: Ensure correct URL format and DOI syntax
- **Build errors**: Check markdown syntax and required fields

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- **Email**: [연구실 이메일]
- **GitHub**: [GitHub Repository]
- **Website**: [웹사이트 URL]

---

**HAI Lab Website** - Human-AI Interaction Lab의 디지털 홈입니다. 🏠✨
