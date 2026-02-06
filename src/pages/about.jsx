import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tabs,
  Tab,
  LinearProgress,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Bolt as ZapIcon,
  Layers as LayersIcon,
  Create as PenToolIcon,
  Add as AddIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { usePortfolio } from '../context/portfolio-context';

/**
 * 아이콘 매핑 함수
 */
const getSkillIcon = (iconName) => {
  const icons = {
    Code: <CodeIcon />,
    Palette: <PaletteIcon />,
    Zap: <ZapIcon />,
    Layers: <LayersIcon />,
    PenTool: <PenToolIcon />
  };
  return icons[iconName] || <CodeIcon />;
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
 * TabPanel 컴포넌트
 */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`about-tabpanel-${index}`}
      aria-labelledby={`about-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

/**
 * SkillCard 컴포넌트
 *
 * Props:
 * @param {object} skill - 스킬 데이터 [Required]
 */
function SkillCard({ skill }) {
  const categoryColor = getCategoryColor(skill.category);

  return (
    <Tooltip title={skill.description} arrow placement="top">
      <Card
        sx={{
          height: '100%',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          border: '1px solid #e2e8f0',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 2,
            borderColor: categoryColor
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: `${categoryColor}15`,
                color: categoryColor,
                mr: 2
              }}
            >
              {getSkillIcon(skill.icon)}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {skill.name}
              </Typography>
              <Chip
                label={skill.category}
                size="small"
                sx={{
                  bgcolor: `${categoryColor}20`,
                  color: categoryColor,
                  fontSize: '0.7rem',
                  height: 20
                }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" color={categoryColor}>
              {skill.level}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={skill.level}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                bgcolor: categoryColor,
                borderRadius: 4,
                transition: 'transform 1s ease-in-out'
              }
            }}
          />
        </CardContent>
      </Card>
    </Tooltip>
  );
}

/**
 * AddSkillDialog 컴포넌트
 */
function AddSkillDialog({ open, onClose, onAdd }) {
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'Frontend',
    icon: 'Code',
    description: ''
  });

  const categories = ['Frontend', 'Framework', 'Design', 'Backend', 'Tools'];
  const icons = ['Code', 'Palette', 'Zap', 'Layers', 'PenTool'];

  const handleAdd = () => {
    if (newSkill.name && newSkill.description) {
      onAdd(newSkill);
      setNewSkill({ name: '', level: 50, category: 'Frontend', icon: 'Code', description: '' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>스킬 추가</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="기술명"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="카테고리"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="아이콘"
            value={newSkill.icon}
            onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
            fullWidth
          >
            {icons.map((icon) => (
              <MenuItem key={icon} value={icon}>{icon}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="숙련도 (%)"
            type="number"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
            inputProps={{ min: 0, max: 100 }}
            fullWidth
          />
          <TextField
            label="설명"
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            multiline
            rows={2}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!newSkill.name || !newSkill.description}>
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * About 페이지 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <About />
 */
function About() {
  const { aboutMeData, addSkill } = usePortfolio();
  const { basicInfo, sections, skills } = aboutMeData;

  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <main className="flex-1">
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          {/* 기본 정보 섹션 */}
          <Card sx={{ mb: 4, overflow: 'visible', border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={basicInfo.photo}
                    alt={basicInfo.name}
                    sx={{
                      width: { xs: 150, md: 200 },
                      height: { xs: 150, md: 200 },
                      mx: 'auto',
                      border: '3px solid',
                      borderColor: '#1e293b',
                      boxShadow: 2
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 2, color: '#1e293b' }}
                  >
                    {basicInfo.name}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SchoolIcon sx={{ color: '#64748b' }} />
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        {basicInfo.education}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CodeIcon sx={{ color: '#64748b' }} />
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        전공: {basicInfo.major}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkIcon sx={{ color: '#64748b' }} />
                      <Typography variant="body1" sx={{ color: '#64748b' }}>
                        경력: {basicInfo.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* 콘텐츠 섹션 (탭) */}
          <Card sx={{ mb: 4, border: '1px solid #e2e8f0' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ px: 2 }}
              >
                {sections.map((section, index) => (
                  <Tab
                    key={section.id}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {section.title}
                        {section.showInHome && (
                          <Tooltip title="홈 탭에 표시됨">
                            <HomeIcon fontSize="small" color="primary" />
                          </Tooltip>
                        )}
                      </Box>
                    }
                    id={`about-tab-${index}`}
                    aria-controls={`about-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
            <CardContent>
              {sections.map((section, index) => (
                <TabPanel key={section.id} value={tabValue} index={index}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
                  >
                    {section.content}
                  </Typography>
                  {section.showInHome && (
                    <Chip
                      icon={<HomeIcon />}
                      label="홈 탭에 표시"
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2 }}
                    />
                  )}
                </TabPanel>
              ))}
            </CardContent>
          </Card>

          {/* 스킬 섹션 */}
          <Card sx={{ border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#1e293b' }}>
                  Skills
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setDialogOpen(true)}
                  sx={{
                    borderColor: '#1e293b',
                    color: '#1e293b',
                    '&:hover': {
                      borderColor: '#0f172a',
                      bgcolor: '#f1f5f9'
                    }
                  }}
                >
                  스킬 추가
                </Button>
              </Box>

              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <Box key={category} sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: getCategoryColor(category),
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: getCategoryColor(category)
                      }}
                    />
                    {category}
                  </Typography>
                  <Grid container spacing={2}>
                    {categorySkills.map((skill) => (
                      <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <SkillCard skill={skill} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* 스킬 추가 다이얼로그 */}
      <AddSkillDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={addSkill}
      />
    </main>
  );
}

export default About;
