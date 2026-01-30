import * as React from 'react';
import { supabase } from '../lib/supabase';
import ProjectCard from '../components/projects/project-card';

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
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });

        if (error) {
          throw error;
        }

        setProjects(data || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
              개발한 프로젝트들을 소개합니다.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-muted-foreground">등록된 프로젝트가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={project.tech_stack}
                  detailUrl={project.detail_url}
                  thumbnailUrl={project.thumbnail_url}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Projects;
