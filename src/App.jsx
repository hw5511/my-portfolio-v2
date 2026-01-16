import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/navigation';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';

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
  );
}

export default App;
