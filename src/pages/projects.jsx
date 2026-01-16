import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

/**
 * Projects 페이지 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <Projects />
 */
function Projects() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Card className="border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-3xl md:text-5xl font-bold tracking-tighter text-center">
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
              <p className="text-muted-foreground text-lg max-w-[700px]">
                Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default Projects;
