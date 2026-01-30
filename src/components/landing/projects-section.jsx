import * as React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectCard from '../projects/project-card';

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
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-center mb-8">
          Projects
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-muted-foreground">등록된 프로젝트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/projects')}>
            더 보기
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
