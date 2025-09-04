import { Handler } from '@netlify/functions';
import * as fs from 'fs';
import * as path from 'path';

interface Member {
  name: string;
  position: string;
  email: string;
  photo: string;
  homepage: string;
  googleScholar: string;
  graduation?: string;
  current?: string;
  research_interests: string[];
}

interface RequestBody {
  member: Member;
}

const handler: Handler = async (event, context) => {
  console.log('Function called with method:', event.httpMethod);
  console.log('Event body:', event.body);
  
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // POST 요청만 허용
  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('Event body:', event.body);
    const { member }: RequestBody = JSON.parse(event.body || '{}');
    console.log('Parsed member:', member);
    
    if (!member || !member.name) {
      console.log('Missing member name');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Member name is required' }),
      };
    }

    // 마크다운 파일 생성
    const researchInterestsText = member.research_interests && member.research_interests.length > 0 
      ? member.research_interests.map(interest => `- ${interest}`).join('\n')
      : '- '

    const markdownContent = `---
name: "${member.name}"
position: "${member.position}"
email: "${member.email}"
photo: "${member.photo}"
homepage: "${member.homepage}"
googleScholar: "${member.googleScholar}"
research_interests:
${researchInterestsText}
---

# ${member.name}

## 소개
${member.position}

## 연락처
- 이메일: ${member.email}
${member.homepage ? `- 홈페이지: [${member.homepage}](${member.homepage})` : ''}
${member.googleScholar ? `- Google Scholar: [프로필 보기](${member.googleScholar})` : ''}

## 연구 관심사
${member.research_interests && member.research_interests.length > 0 
  ? member.research_interests.map(interest => `- ${interest}`).join('\n')
  : '- 아직 연구 관심사가 설정되지 않았습니다.'
}

${member.graduation ? `## 학력\n- 졸업: ${member.graduation}` : ''}
${member.current ? `## 현재\n- ${member.current}` : ''}
`;

    // 간단한 파일명 생성
    const timestamp = Date.now();
    const fileName = `member-${timestamp}.md`;
    const filePath = path.join(process.cwd(), 'content', 'members', fileName);

    // content/members 폴더가 없으면 생성
    const membersDir = path.join(process.cwd(), 'content', 'members');
    if (!fs.existsSync(membersDir)) {
      fs.mkdirSync(membersDir, { recursive: true });
    }

    // 파일 생성
    fs.writeFileSync(filePath, markdownContent, 'utf8');

    // Gatsby가 파일 변경을 감지할 수 있도록 약간의 지연 후 파일 수정
    setTimeout(() => {
      try {
        const stats = fs.statSync(filePath);
        fs.utimesSync(filePath, stats.atime, new Date());
      } catch (error) {
        console.log('File touch failed:', error);
      }
    }, 100);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: '멤버가 성공적으로 추가되었습니다.',
        fileName: fileName,
        filePath: filePath
      }),
    };

  } catch (error) {
    console.error('Error adding member:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to add member',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };
