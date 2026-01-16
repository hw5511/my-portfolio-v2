import * as React from 'react';
import { Card, CardContent } from '../ui/card';

/**
 * SkillSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center min-h-[250px] p-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">
              Skill Tree
            </h2>
            <p className="text-muted-foreground text-lg max-w-[700px]">
              여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default SkillSection;
