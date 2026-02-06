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
            mb: { xs: 4, md: 6 }
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
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
                  border: '4px solid rgba(255,255,255,0.5)'
                }}
              />
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                {basicInfo.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                {basicInfo.education}
              </Typography>
              <Chip
                label={basicInfo.experience}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
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
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ mb: 1, color: 'primary.main' }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
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
                    borderRadius: 2
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
