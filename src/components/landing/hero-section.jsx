import * as React from 'react';
import { Card, CardContent } from '../ui/card';

/**
 * HeroSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] p-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Hero Section
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[700px]">
              여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default HeroSection;
