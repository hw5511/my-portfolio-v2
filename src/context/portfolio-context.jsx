import * as React from 'react';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

/**
 * PortfolioContext
 *
 * About Me 데이터와 홈 탭 연동을 위한 Context
 *
 * Example usage:
 * const { aboutMeData, getHomeData } = usePortfolio();
 */
const PortfolioContext = createContext(null);

/**
 * PortfolioProvider 컴포넌트
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState({
    basicInfo: {
      name: '양희우',
      education: 'OO대학교 시각디자인과',
      major: '웹 개발',
      experience: '신입',
      photo: 'https://picsum.photos/300/300?random=1'
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        content: '나의 강아지를 위한 홈페이지를 만들고 싶었습니다. 처음에는 단순한 호기심으로 시작했지만, 코드 한 줄 한 줄이 화면에 나타나는 것을 보며 개발의 매력에 빠지게 되었습니다. 강아지 사진을 예쁘게 보여주는 갤러리를 만들면서 HTML과 CSS를 배웠고, 방문자들이 댓글을 남길 수 있게 하고 싶어서 JavaScript를 공부했습니다. 지금은 더 많은 사람들에게 도움이 되는 서비스를 만들고 싶다는 꿈을 가지고 있습니다.',
        showInHome: true
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        content: '재밌고, 신기한 것을 만들자! 사용자가 "와, 이게 되네?"라고 말할 수 있는 경험을 만드는 것이 저의 목표입니다. 복잡한 기술도 중요하지만, 결국 사람들에게 즐거움과 편리함을 주는 것이 개발의 본질이라고 생각합니다.',
        showInHome: true
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        content: '취미는 강아지와 산책하기, 카페 가기입니다. 주말이면 반려견과 함께 동네 공원을 산책하며 아이디어를 떠올리곤 합니다. 조용한 카페에서 코딩하는 것도 좋아해요. 커피 한 잔과 함께하는 코딩 시간이 가장 행복합니다.',
        showInHome: false
      }
    ],
    skills: [
      { id: 1, icon: 'Code', name: 'HTML', level: 80, category: 'Frontend', description: '시맨틱 마크업과 접근성을 고려한 웹 구조 설계' },
      { id: 2, icon: 'Palette', name: 'CSS', level: 75, category: 'Frontend', description: 'Flexbox, Grid, 애니메이션을 활용한 반응형 스타일링' },
      { id: 3, icon: 'Zap', name: 'JavaScript', level: 70, category: 'Frontend', description: 'ES6+, DOM 조작, 비동기 프로그래밍' },
      { id: 4, icon: 'Layers', name: 'React', level: 60, category: 'Framework', description: 'Hooks, Context API, 컴포넌트 기반 개발' },
      { id: 5, icon: 'PenTool', name: 'Figma', level: 65, category: 'Design', description: 'UI/UX 디자인, 프로토타이핑, 디자인 시스템' }
    ]
  });

  /**
   * 홈 탭용 데이터 자동 생성
   * showInHome이 true인 섹션과 상위 스킬만 반환
   */
  const getHomeData = useCallback(() => {
    const homeContent = aboutMeData.sections
      .filter(section => section.showInHome)
      .map(section => ({
        id: section.id,
        title: section.title,
        summary: section.content.length > 100
          ? section.content.substring(0, 100) + '...'
          : section.content
      }));

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4);

    return {
      content: homeContent,
      skills: topSkills,
      basicInfo: aboutMeData.basicInfo
    };
  }, [aboutMeData]);

  /**
   * About Me 데이터 업데이트
   */
  const updateAboutMeData = useCallback((newData) => {
    setAboutMeData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  /**
   * 특정 섹션 업데이트
   */
  const updateSection = useCallback((sectionId, updates) => {
    setAboutMeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  }, []);

  /**
   * 스킬 업데이트
   */
  const updateSkill = useCallback((skillId, updates) => {
    setAboutMeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === skillId ? { ...skill, ...updates } : skill
      )
    }));
  }, []);

  /**
   * 스킬 추가
   */
  const addSkill = useCallback((newSkill) => {
    setAboutMeData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...newSkill, id: Date.now() }]
    }));
  }, []);

  const value = useMemo(() => ({
    aboutMeData,
    setAboutMeData,
    getHomeData,
    updateAboutMeData,
    updateSection,
    updateSkill,
    addSkill
  }), [aboutMeData, getHomeData, updateAboutMeData, updateSection, updateSkill, addSkill]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

/**
 * usePortfolio 훅
 *
 * Example usage:
 * const { aboutMeData, getHomeData } = usePortfolio();
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export default PortfolioContext;
