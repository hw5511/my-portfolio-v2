import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Tooltip,
  Button,
  Grid
} from '@mui/material';
import {
  Code as CodeIcon,
  Palette as PaletteIcon,
  Bolt as ZapIcon,
  Layers as LayersIcon,
  Create as PenToolIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/portfolio-context';

/**
 * 아이콘 매핑 함수
 */
const getSkillIcon = (iconName, size = 'medium') => {
  const icons = {
    Code: <CodeIcon fontSize={size} />,
    Palette: <PaletteIcon fontSize={size} />,
    Zap: <ZapIcon fontSize={size} />,
    Layers: <LayersIcon fontSize={size} />,
    PenTool: <PenToolIcon fontSize={size} />
  };
  return icons[iconName] || <CodeIcon fontSize={size} />;
};

/**
 * 카테고리별 색상
 */
const getCategoryColor = (category) => {
  const colors = {
    Frontend: '#3b82f6',
    Framework: '#8b5cf6',
    Design: '#ec4899',
    Backend: '#10b981',
    Tools: '#f59e0b'
  };
  return colors[category] || '#6b7280';
};

/**
 * SkillSection 컴포넌트
 *
 * 홈 탭에 표시되는 스킬 요약 섹션
 * Context에서 상위 4개 스킬만 표시
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  const navigate = useNavigate();
  const { getHomeData } = usePortfolio();
  const homeData = getHomeData();
  const { skills } = homeData;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 12 },
        bgcolor: '#f8fafc'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          fontWeight="bold"
          textAlign="center"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            mb: 2
          }}
        >
          Skills
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: { xs: 4, md: 6 }, maxWidth: 600, mx: 'auto' }}
        >
          숙련도가 높은 주요 기술 스택입니다
        </Typography>

        <Grid container spacing={3}>
          {skills.map((skill) => {
            const categoryColor = getCategoryColor(skill.category);
            return (
              <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Tooltip title={skill.description} arrow placement="top">
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          bgcolor: `${categoryColor}15`,
                          color: categoryColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2
                        }}
                      >
                        {getSkillIcon(skill.icon, 'large')}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        {skill.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: categoryColor,
                          fontWeight: 'bold',
                          mb: 2
                        }}
                      >
                        {skill.level}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: categoryColor,
                            borderRadius: 3,
                            transition: 'transform 1s ease-in-out'
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/about')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            전체 스킬 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SkillSection;
