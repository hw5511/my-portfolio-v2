import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * ProjectsSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center min-h-[250px] p-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">
              Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-[700px] mb-6">
              여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
            </p>
            <Button onClick={() => navigate('/projects')}>
              더 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ProjectsSection;
