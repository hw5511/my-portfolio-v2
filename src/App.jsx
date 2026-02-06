import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { PortfolioProvider } from './context/portfolio-context';
import Navigation from './components/common/navigation';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';

/**
 * MUI 테마 설정
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e293b',
      light: '#475569',
      dark: '#0f172a'
    },
    secondary: {
      main: '#8b5cf6'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
        }
      }
    }
  }
});

/**
 * App 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PortfolioProvider>
        <HashRouter>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </HashRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
