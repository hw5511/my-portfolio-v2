import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { ExternalLink } from 'lucide-react';

/**
 * ProjectCard 컴포넌트
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 설명 [Required]
 * @param {string[]} techStack - 기술 스택 목록 [Optional, 기본값: []]
 * @param {string} detailUrl - 프로젝트 상세 링크 [Optional]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Optional]
 *
 * Example usage:
 * <ProjectCard
 *   title="My Portfolio"
 *   description="개인 포트폴리오 웹사이트"
 *   techStack={['React', 'Vite']}
 *   detailUrl="https://example.com"
 *   thumbnailUrl="https://image.thum.io/get/https://example.com"
 * />
 */
function ProjectCard({ title, description, techStack = [], detailUrl, thumbnailUrl }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {thumbnailUrl && (
        <div className="relative overflow-hidden aspect-square">
          <img
            src={thumbnailUrl}
            alt={`${title} 썸네일`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">
            {title}
          </h3>
          {detailUrl && (
            <a
              href={detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${title} 바로가기`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
