import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Grid
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/portfolio-context';
import { CometCard } from '../ui/comet-card';

/**
 * AboutSection 컴포넌트
 *
 * 홈 탭에 표시되는 About Me 요약 섹션
 * Context에서 showInHome이 true인 콘텐츠만 표시
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  const navigate = useNavigate();
  const { getHomeData } = usePortfolio();
  const homeData = getHomeData();
  const { basicInfo, content } = homeData;

  const [randomImageId] = useState(() => Math.floor(Math.random() * 1000));

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 12 },
        bgcolor: 'background.paper'
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
            mb: { xs: 4, md: 6 },
            color: '#1e293b'
          }}
        >
          About Me
        </Typography>

        <Grid container spacing={4} alignItems="center">
          {/* 프로필 사진 + 기본 정보 (CometCard 적용) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CometCard rotateDepth={15} translateDepth={20}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  bgcolor: '#1e293b',
                  border: '1px solid',
                  borderColor: '#334155',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                  }
                }}
              >
                <Avatar
                  src={`https://picsum.photos/300/300?random=${randomImageId}`}
                  alt={basicInfo.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '3px solid',
                    borderColor: '#64748b',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                  }}
                />
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#f8fafc' }}>
                  {basicInfo.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                  {basicInfo.education}
                </Typography>
                <Chip
                  label={basicInfo.experience}
                  size="small"
                  sx={{
                    bgcolor: '#475569',
                    color: '#f1f5f9',
                    fontWeight: 'bold'
                  }}
                />
              </Card>
            </CometCard>
          </Grid>

          {/* 메인 콘텐츠 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {content.map((section) => (
                <Card
                  key={section.id}
                  sx={{
                    transition: 'all 0.3s ease',
                    border: '1px solid #e2e8f0',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: 2,
                      borderColor: '#1e293b'
                    }
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ mb: 1, color: '#1e293b' }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ lineHeight: 1.7, color: '#64748b' }}
                    >
                      {section.summary}
                    </Typography>
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/about')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#1e293b',
                    '&:hover': {
                      bgcolor: '#0f172a'
                    }
                  }}
                >
                  더 알아보기
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutSection;
