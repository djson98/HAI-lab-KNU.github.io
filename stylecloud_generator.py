#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
StyleCloud 워드클라우드 생성기
HAI Lab 연구 키워드들을 아름다운 스타일로 시각화
"""

import stylecloud
import os

def create_stylecloud():
    """StyleCloud로 아름다운 워드클라우드 생성"""
    
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
    
    # 키워드를 텍스트로 변환 (빈도수만큼 반복)
    text_data = []
    for word, freq in keywords.items():
        text_data.extend([word] * freq)
    
    text = ' '.join(text_data)
    
    # StyleCloud 생성 - 원형 스타일
    stylecloud.gen_stylecloud(
        text=text,
        output_name='hai_stylecloud.png',
        size=1024,
        icon_name='fas fa-brain',  # 뇌 아이콘
        palette='viridis',  # 색상 팔레트
        background_color='white',
        max_font_size=100,
        gradient='horizontal',  # 그라데이션 방향
        invert_mask=False
    )
    
    print("StyleCloud 워드클라우드가 생성되었습니다: static/images/hai_stylecloud.png")
    return 'static/images/hai_stylecloud.png'

def create_stylecloud_2():
    """두 번째 스타일의 StyleCloud 생성"""
    
    keywords = {
        'Human-AI Interaction': 12,
        'Proactive Systems': 10,
        'Context Awareness': 9,
        'User Sensing': 8,
        'Ubiquitous Computing': 8,
        'Smart Speaker': 7,
        'Voice Interface': 7,
        'Conversational AI': 6,
        'Proactive Interaction': 6,
        'Interruptibility': 5,
        'Microlearning': 5,
        'Driving Assistant': 6,
        'Voice Driving Agent': 5,
        'Situational Awareness': 5,
        'Blind Spot Detection': 4,
        'Road Safety': 4,
        'Emotion Recognition': 7,
        'Emotional States': 6,
        'Psychological States': 5,
        'Stress Detection': 4,
        'Attention Detection': 4,
        'Cognitive Load': 4,
        'Mobile Computing': 6,
        'Experience Sampling': 5,
        'Mobile ESM': 4,
        'Wearable Devices': 4,
        'IoT Sensors': 4,
        'IoT Patch': 5,
        'Medical IoT': 4,
        'Occlusion Therapy': 4,
        'Adherence Monitoring': 4,
        'Digital Healthcare': 4,
        'Multimodal Dataset': 5,
        'K-EmoCon': 4,
        'K-EmoPhone': 4,
        'Physiological Signals': 4,
        'EEG': 3,
        'Behavior Change': 5,
        'Goal Commitment': 4,
        'Sticky Goals': 3,
        'Behavioral Patterns': 3,
        'Zero Trust': 4,
        'Risk Scoring': 3,
        'Endpoint Security': 3,
        'Timing Detection': 5,
        'Opportune Moments': 4,
        'Contextual Factors': 4,
        'Natural Interaction': 4,
        'JARVIS': 3,
        'AI Agent': 3,
        'Daily Life Integration': 3,
        'Mental Health': 3,
        'Activity Recognition': 3
    }
    
    # 키워드를 텍스트로 변환
    text_data = []
    for word, freq in keywords.items():
        text_data.extend([word] * freq)
    
    text = ' '.join(text_data)
    
    # StyleCloud 생성 - 하트 모양
    stylecloud.gen_stylecloud(
        text=text,
        output_name='hai_stylecloud_heart.png',
        size=1024,
        icon_name='fas fa-heart',  # 하트 아이콘
        palette='plasma',  # 플라즈마 색상 팔레트
        background_color='#f8fafc',
        max_font_size=120,
        gradient='vertical',  # 세로 그라데이션
        invert_mask=False
    )
    
    print("하트 모양 StyleCloud가 생성되었습니다: static/images/hai_stylecloud_heart.png")
    return 'static/images/hai_stylecloud_heart.png'

def create_stylecloud_3():
    """세 번째 스타일의 StyleCloud 생성 - 로봇 모양"""
    
    keywords = {
        'Human-AI Interaction': 12,
        'Proactive Systems': 10,
        'Context Awareness': 9,
        'User Sensing': 8,
        'Ubiquitous Computing': 8,
        'Smart Speaker': 7,
        'Voice Interface': 7,
        'Conversational AI': 6,
        'Proactive Interaction': 6,
        'Interruptibility': 5,
        'Microlearning': 5,
        'Driving Assistant': 6,
        'Voice Driving Agent': 5,
        'Situational Awareness': 5,
        'Blind Spot Detection': 4,
        'Road Safety': 4,
        'Emotion Recognition': 7,
        'Emotional States': 6,
        'Psychological States': 5,
        'Stress Detection': 4,
        'Attention Detection': 4,
        'Cognitive Load': 4,
        'Mobile Computing': 6,
        'Experience Sampling': 5,
        'Mobile ESM': 4,
        'Wearable Devices': 4,
        'IoT Sensors': 4,
        'IoT Patch': 5,
        'Medical IoT': 4,
        'Occlusion Therapy': 4,
        'Adherence Monitoring': 4,
        'Digital Healthcare': 4,
        'Multimodal Dataset': 5,
        'K-EmoCon': 4,
        'K-EmoPhone': 4,
        'Physiological Signals': 4,
        'EEG': 3,
        'Behavior Change': 5,
        'Goal Commitment': 4,
        'Sticky Goals': 3,
        'Behavioral Patterns': 3,
        'Zero Trust': 4,
        'Risk Scoring': 3,
        'Endpoint Security': 3,
        'Timing Detection': 5,
        'Opportune Moments': 4,
        'Contextual Factors': 4,
        'Natural Interaction': 4,
        'JARVIS': 3,
        'AI Agent': 3,
        'Daily Life Integration': 3,
        'Mental Health': 3,
        'Activity Recognition': 3
    }
    
    # 키워드를 텍스트로 변환
    text_data = []
    for word, freq in keywords.items():
        text_data.extend([word] * freq)
    
    text = ' '.join(text_data)
    
    # StyleCloud 생성 - 로봇 모양
    stylecloud.gen_stylecloud(
        text=text,
        output_name='hai_stylecloud_robot.png',
        size=1024,
        icon_name='fas fa-robot',  # 로봇 아이콘
        palette='coolwarm',  # 쿨웜 색상 팔레트
        background_color='#1e293b',  # 어두운 배경
        max_font_size=100,
        gradient='radial',  # 방사형 그라데이션
        invert_mask=True  # 마스크 반전
    )
    
    print("로봇 모양 StyleCloud가 생성되었습니다: static/images/hai_stylecloud_robot.png")
    return 'static/images/hai_stylecloud_robot.png'

def main():
    """메인 함수"""
    print("HAI Lab StyleCloud 생성기")
    print("=" * 40)
    
    # static/images 디렉토리 생성
    os.makedirs('static/images', exist_ok=True)
    
    try:
        # 1. 기본 원형 스타일
        print("1. 원형 스타일 워드클라우드 생성 중...")
        create_stylecloud()
        
        # 2. 하트 모양 스타일
        print("\n2. 하트 모양 워드클라우드 생성 중...")
        create_stylecloud_2()
        
        # 3. 로봇 모양 스타일
        print("\n3. 로봇 모양 워드클라우드 생성 중...")
        create_stylecloud_3()
        
        print("\n✅ 모든 StyleCloud가 성공적으로 생성되었습니다!")
        print("생성된 파일들:")
        print("- static/images/hai_stylecloud.png (원형)")
        print("- static/images/hai_stylecloud_heart.png (하트)")
        print("- static/images/hai_stylecloud_robot.png (로봇)")
        
    except Exception as e:
        print(f"❌ 오류가 발생했습니다: {e}")

if __name__ == "__main__":
    main()
