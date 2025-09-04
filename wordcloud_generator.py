#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
워드클라우드 생성기
HAI Lab 연구 키워드들을 시각화하는 워드클라우드 생성 스크립트
"""

import matplotlib.pyplot as plt
from wordcloud import WordCloud
import numpy as np
from PIL import Image
import os

def create_wordcloud():
    """HAI Lab 연구 키워드로 워드클라우드 생성"""
    
    # HAI Lab 연구 키워드들 (실제 프로젝트 기반)
    keywords = {
        # 핵심 연구 영역
        'Human-AI Interaction': 12,
        'Proactive Systems': 10,
        'Context Awareness': 9,
        'User Sensing': 8,
        'Ubiquitous Computing': 8,
        
        # 스마트 스피커 & 음성 인터페이스
        'Smart Speaker': 7,
        'Voice Interface': 7,
        'Conversational AI': 6,
        'Proactive Interaction': 6,
        'Interruptibility': 5,
        'Microlearning': 5,
        
        # 운전 보조 시스템
        'Driving Assistant': 6,
        'Voice Driving Agent': 5,
        'Situational Awareness': 5,
        'Blind Spot Detection': 4,
        'Road Safety': 4,
        
        # 감정 인식 & 심리 상태
        'Emotion Recognition': 7,
        'Emotional States': 6,
        'Psychological States': 5,
        'Stress Detection': 4,
        'Attention Detection': 4,
        'Cognitive Load': 4,
        
        # 모바일 & 웨어러블
        'Mobile Computing': 6,
        'Experience Sampling': 5,
        'Mobile ESM': 4,
        'Wearable Devices': 4,
        'IoT Sensors': 4,
        
        # 의료 IoT & 헬스케어
        'IoT Patch': 5,
        'Medical IoT': 4,
        'Occlusion Therapy': 4,
        'Adherence Monitoring': 4,
        'Digital Healthcare': 4,
        
        # 데이터셋 & 멀티모달
        'Multimodal Dataset': 5,
        'K-EmoCon': 4,
        'K-EmoPhone': 4,
        'Physiological Signals': 4,
        'EEG': 3,
        
        # 행동 변화 & 목표 설정
        'Behavior Change': 5,
        'Goal Commitment': 4,
        'Sticky Goals': 3,
        'Behavioral Patterns': 3,
        
        # 보안 & 제로트러스트
        'Zero Trust': 4,
        'Risk Scoring': 3,
        'Endpoint Security': 3,
        
        # 타이밍 & 최적화
        'Timing Detection': 5,
        'Opportune Moments': 4,
        'Contextual Factors': 4,
        'Natural Interaction': 4,
        
        # 기타
        'JARVIS': 3,
        'AI Agent': 3,
        'Daily Life Integration': 3,
        'Mental Health': 3,
        'Activity Recognition': 3
    }
    
    # 원형 마스크 생성
    x, y = np.ogrid[:600, :600]
    mask = (x - 300) ** 2 + (y - 300) ** 2 > 280 ** 2
    mask = 255 * mask.astype(int)
    
    # 워드클라우드 설정 - 원형으로!
    wordcloud = WordCloud(
        width=600,
        height=600,
        background_color='#f8fafc',  # 연한 회색 배경
        colormap='plasma',  # 더 화려한 색상 팔레트
        max_words=50,
        relative_scaling=0.8,
        random_state=42,
        font_path=None,
        prefer_horizontal=0.5,  # 원형에서는 균등하게
        min_font_size=10,
        max_font_size=100,
        mask=mask,  # 원형 마스크 적용
        contour_width=2,
        contour_color='#3b82f6',
        collocations=False,  # 단어 조합 비활성화
        normalize_plurals=False
    ).generate_from_frequencies(keywords)
    
    # 커스텀 색상 적용
    def color_func(word, font_size, position, orientation, random_state=None, **kwargs):
        # 키워드별로 다른 색상 적용
        color_map = {
            'Human-AI Interaction': '#3b82f6',  # 파란색
            'Proactive Systems': '#8b5cf6',     # 보라색
            'Smart Speaker': '#06b6d4',         # 청록색
            'Voice Interface': '#10b981',       # 초록색
            'Emotion Recognition': '#f59e0b',   # 주황색
            'Driving Assistant': '#ef4444',     # 빨간색
            'IoT Patch': '#84cc16',             # 라임색
            'Mobile Computing': '#6366f1',      # 인디고색
            'Context Awareness': '#ec4899',     # 핑크색
            'Ubiquitous Computing': '#14b8a6'   # 틸색
        }
        return color_map.get(word, '#64748b')  # 기본 회색
    
    wordcloud.recolor(color_func=color_func)
    
    # 워드클라우드 시각화 - 원형으로!
    plt.figure(figsize=(12, 12))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    
    # 제목 스타일링
    plt.suptitle('HAI Lab Research Keywords', 
                fontsize=24, fontweight='bold', 
                color='#1e293b', y=0.95)
    
    # 서브타이틀 추가
    plt.figtext(0.5, 0.02, 'Human-AI Interaction Laboratory', 
               ha='center', fontsize=14, color='#64748b', style='italic')
    
    # 저장 - 고품질
    output_path = 'static/images/hai_wordcloud.png'
    plt.savefig(output_path, dpi=300, bbox_inches='tight', 
                facecolor='#f8fafc', edgecolor='none', 
                pad_inches=0.2)
    
    print(f"워드클라우드가 생성되었습니다: {output_path}")
    
    # 화면에 표시
    plt.show()
    
    return output_path

def create_custom_shape_wordcloud():
    """커스텀 모양으로 워드클라우드 생성 (예: 원형)"""
    
    keywords = {
        # 핵심 연구 영역
        'Human-AI Interaction': 12,
        'Proactive Systems': 10,
        'Context Awareness': 9,
        'User Sensing': 8,
        'Ubiquitous Computing': 8,
        
        # 스마트 스피커 & 음성 인터페이스
        'Smart Speaker': 7,
        'Voice Interface': 7,
        'Conversational AI': 6,
        'Proactive Interaction': 6,
        'Interruptibility': 5,
        'Microlearning': 5,
        
        # 운전 보조 시스템
        'Driving Assistant': 6,
        'Voice Driving Agent': 5,
        'Situational Awareness': 5,
        'Blind Spot Detection': 4,
        'Road Safety': 4,
        
        # 감정 인식 & 심리 상태
        'Emotion Recognition': 7,
        'Emotional States': 6,
        'Psychological States': 5,
        'Stress Detection': 4,
        'Attention Detection': 4,
        'Cognitive Load': 4,
        
        # 모바일 & 웨어러블
        'Mobile Computing': 6,
        'Experience Sampling': 5,
        'Mobile ESM': 4,
        'Wearable Devices': 4,
        'IoT Sensors': 4,
        
        # 의료 IoT & 헬스케어
        'IoT Patch': 5,
        'Medical IoT': 4,
        'Occlusion Therapy': 4,
        'Adherence Monitoring': 4,
        'Digital Healthcare': 4,
        
        # 데이터셋 & 멀티모달
        'Multimodal Dataset': 5,
        'K-EmoCon': 4,
        'K-EmoPhone': 4,
        'Physiological Signals': 4,
        'EEG': 3,
        
        # 행동 변화 & 목표 설정
        'Behavior Change': 5,
        'Goal Commitment': 4,
        'Sticky Goals': 3,
        'Behavioral Patterns': 3,
        
        # 보안 & 제로트러스트
        'Zero Trust': 4,
        'Risk Scoring': 3,
        'Endpoint Security': 3,
        
        # 타이밍 & 최적화
        'Timing Detection': 5,
        'Opportune Moments': 4,
        'Contextual Factors': 4,
        'Natural Interaction': 4,
        
        # 기타
        'JARVIS': 3,
        'AI Agent': 3,
        'Daily Life Integration': 3,
        'Mental Health': 3,
        'Activity Recognition': 3
    }
    
    # 원형 마스크 생성
    x, y = np.ogrid[:600, :600]
    mask = (x - 300) ** 2 + (y - 300) ** 2 > 280 ** 2
    mask = 255 * mask.astype(int)
    
    # 워드클라우드 생성
    wordcloud = WordCloud(
        width=600,
        height=600,
        background_color='white',
        colormap='plasma',
        max_words=30,
        relative_scaling=0.5,
        random_state=42,
        mask=mask,
        contour_width=3,
        contour_color='steelblue'
    ).generate_from_frequencies(keywords)
    
    # 시각화
    plt.figure(figsize=(10, 10))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title('HAI Lab Research Keywords (Circular)', fontsize=16, fontweight='bold', pad=20)
    
    # 저장
    output_path = 'static/images/hai_wordcloud_circular.png'
    plt.savefig(output_path, dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    
    print(f"원형 워드클라우드가 생성되었습니다: {output_path}")
    plt.show()
    
    return output_path

def main():
    """메인 함수"""
    print("HAI Lab 워드클라우드 생성기")
    print("=" * 40)
    
    # static/images 디렉토리 생성
    os.makedirs('static/images', exist_ok=True)
    
    try:
        # 기본 워드클라우드 생성
        print("1. 기본 워드클라우드 생성 중...")
        create_wordcloud()
        
        # 원형 워드클라우드 생성
        print("\n2. 원형 워드클라우드 생성 중...")
        create_custom_shape_wordcloud()
        
        print("\n✅ 모든 워드클라우드가 성공적으로 생성되었습니다!")
        
    except Exception as e:
        print(f"❌ 오류가 발생했습니다: {e}")
        print("필요한 패키지를 설치해주세요:")
        print("pip install wordcloud matplotlib pillow numpy")

if __name__ == "__main__":
    main()
