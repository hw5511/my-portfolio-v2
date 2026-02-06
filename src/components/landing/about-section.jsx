import * as React from 'react';
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
          {/* 프로필 사진 + 기본 정보 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                textAlign: 'center',
                p: 3,
                bgcolor: '#f8fafc',
                border: '1px solid',
                borderColor: '#e2e8f0'
              }}
            >
              <Avatar
                src={basicInfo.photo}
                alt={basicInfo.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  border: '3px solid',
                  borderColor: '#1e293b'
                }}
              />
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#1e293b' }}>
                {basicInfo.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                {basicInfo.education}
              </Typography>
              <Chip
                label={basicInfo.experience}
                size="small"
                sx={{
                  bgcolor: '#1e293b',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Card>
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
